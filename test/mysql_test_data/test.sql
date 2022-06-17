/*
 Navicat Premium Data Transfer

 Source Server         : 1
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 17/06/2022 21:21:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for 1
-- ----------------------------
DROP TABLE IF EXISTS `1`;
CREATE TABLE `1`  (
  `qw` tinyint(1) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of 1
-- ----------------------------

-- ----------------------------
-- Table structure for qqqq
-- ----------------------------
DROP TABLE IF EXISTS `qqqq`;
CREATE TABLE `qqqq`  (
  `aa` datetime(0) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of qqqq
-- ----------------------------
INSERT INTO `qqqq` VALUES ('2022-06-16 00:00:00');

-- ----------------------------
-- Table structure for user2
-- ----------------------------
DROP TABLE IF EXISTS `user2`;
CREATE TABLE `user2`  (
  `user` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `Age` float NULL DEFAULT NULL,
  `sex` tinyint(1) NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 79 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user2
-- ----------------------------
INSERT INTO `user2` VALUES ('qwe', 2, 1, 1);
INSERT INTO `user2` VALUES ('e2', 123, 1, 2);
INSERT INTO `user2` VALUES ('qwe', 2, 1, 3);
INSERT INTO `user2` VALUES ('qwe', 2, 1, 4);
INSERT INTO `user2` VALUES ('qwe', 2, 1, 5);
INSERT INTO `user2` VALUES ('e2', 3, 1, 6);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 7);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 8);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 9);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 10);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 11);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 12);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 13);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 14);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 15);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 16);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 17);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 18);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 19);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 20);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 21);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 22);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 23);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 24);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 25);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 26);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 27);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 28);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 29);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 30);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 31);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 32);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 33);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 34);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 35);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 36);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 37);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 38);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 39);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 40);
INSERT INTO `user2` VALUES ('qwe', 1, 1, 41);
INSERT INTO `user2` VALUES ('22', 12, NULL, 67);
INSERT INTO `user2` VALUES ('22', 12, NULL, 68);
INSERT INTO `user2` VALUES ('22', 12, NULL, 69);
INSERT INTO `user2` VALUES ('22', 112, NULL, 70);
INSERT INTO `user2` VALUES ('22', 112, NULL, 71);
INSERT INTO `user2` VALUES ('22', 112, NULL, 72);
INSERT INTO `user2` VALUES ('22', 112, NULL, 73);
INSERT INTO `user2` VALUES ('22', 112, NULL, 74);
INSERT INTO `user2` VALUES ('22', 112, NULL, 75);
INSERT INTO `user2` VALUES ('22', 112, NULL, 76);
INSERT INTO `user2` VALUES ('22', 112, NULL, 77);
INSERT INTO `user2` VALUES ('22', 112, NULL, 78);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('tang', '123');
INSERT INTO `users` VALUES ('1w', '123');
INSERT INTO `users` VALUES ('qwe', '12');

SET FOREIGN_KEY_CHECKS = 1;
