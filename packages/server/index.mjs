import http from "node:http";
import log4js from "log4js";
import express from "express";
import serveIndex from "serve-index";
import { Server } from "socket.io";
import { ROOM_MAX_USER_COUNT } from "./src/constants.mjs";

log4js.configure({
  appenders: {
    file: {
      type: "file",
      filename: "app.log",
      layout: {
        type: "pattern",
        pattern: "%r %p - %m",
      },
    },
  },
  categories: {
    default: {
      appenders: ["file"],
      level: "debug",
    },
  },
});

const logger = log4js.getLogger();
logger.level = "debug";

const app = express();
app.use(serveIndex("./public"));
app.use(express.static("./public"));

/**
 * 设置跨域
 */
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Headers", "content-type");

  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

  if (req.method.toLocaleLowerCase() === "options") {
    res.send(200);
  } else {
    next();
  }
});

const httpServer = http.createServer(app, "0.0.0.0");

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.sockets.on("connection", (socket) => {
  socket.on("join", (room) => {
    socket.join(room);

    const currentRoomSockets = io.sockets.adapter.rooms.get(room);
    const currentRoomUserSize = currentRoomSockets
      ? currentRoomSockets.size
      : 0;

    logger.debug(`room: ${room} user number is ${currentRoomUserSize}`);

    if (currentRoomUserSize > ROOM_MAX_USER_COUNT) {
      /**
       * 如果房间满了，则当前 socket 退出房间并且推送房间已经满了的消息
       */
      socket.leave(room);
      socket.emit("full", room, socket.id);
    } else {
      /**
       * 房间没满，发送给除了自己以外的房间内的所有人进房信息
       */
      socket.emit("joined", room, socket.id);

      if (currentRoomUserSize > 1) {
        /**
         * 通知其他用户有人进房间了
         */
        socket.emit("other_join", room, socket.id);
      }
    }
  });

  socket.on("leave", (room) => {
    const currentRoomSockets = io.sockets.adapter.rooms.get(room);
    const currentRoomUserSize = currentRoomSockets
      ? currentRoomSockets.size
      : 0;

    logger.debug(`room: ${room} user number is ${currentRoomUserSize}`);

    /**
     * 通知其他用户有人离开了
     */
    socket.to(room).emit("bye", room, socket.id);

    /**
     * 通知用户服务器已经处理
     */
    socket.emit("left", room, socket.id);
  });
});

httpServer.listen(8080);
