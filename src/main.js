import Phaser from "phaser";
import InstructionScene from "./scenes/InstructionScene"; // 导入 InstructionScene
import TrialScene from "./scenes/TrialScene";

const config = {
  type: Phaser.AUTO, // 自动选择渲染模式
  width: 800, // 游戏画布宽度
  height: 600, // 游戏画布高度
  parent: "game-container", // Phaser 绑定到的 HTML 容器
  scene: [InstructionScene, TrialScene], // 加载 InstructionScene
  scale: {
    mode: Phaser.Scale.FIT, // 自适应屏幕
    autoCenter: Phaser.Scale.CENTER_BOTH, // 居中画布
  },
};

const game = new Phaser.Game(config); // 初始化 Phaser 游戏
