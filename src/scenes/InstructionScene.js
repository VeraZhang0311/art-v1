import Phaser from "phaser";

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: "InstructionScene" });
  }

  preload() {
    this.load.image("background", "assets/images/library.jpg");
    this.load.image("welcome", "assets/images/welcome.png");
  }

  create() {
    // 添加背景
    this.add.image(400, 300, "background").setScale(1);

    this.add.image(400, 250, "welcome");

    // 创建按钮背景
    const graphics = this.add.graphics();
    graphics.fillStyle(0x4CAF50, 1); // 设置按钮颜色（绿色）
    graphics.fillRoundedRect(300, 350, 200, 60, 15); // 绘制圆角矩形 (x, y, width, height, radius)

    // 添加按钮文字
    const startButtonText = this.add.text(400, 380, "START", {
      fontSize: "24px",
      color: "#fff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // 设置交互事件
    const startButton = this.add.rectangle(400, 380, 200, 60).setInteractive({ useHandCursor: true }); // 点击区域
    startButton.on("pointerdown", () => {
      this.scene.start("TrialScene"); // 切换到下一个场景
    });

    // 鼠标悬停效果
    startButton.on("pointerover", () => {
      graphics.clear();
      graphics.fillStyle(0x45a049, 1); // 改变按钮颜色（更亮的绿色）
      graphics.fillRoundedRect(300, 350, 200, 60, 15);
    });

    startButton.on("pointerout", () => {
      graphics.clear();
      graphics.fillStyle(0x4CAF50, 1); // 恢复默认颜色
      graphics.fillRoundedRect(300, 350, 200, 60, 15);
    });
  }
}
