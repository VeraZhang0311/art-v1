import Phaser from "phaser";

export default class InstructionScene extends Phaser.Scene {
  constructor() {
    super({ key: "InstructionScene" });
  }

  preload() {
    this.load.image("background", "assets/images/library.jpg"); // 加载背景图
  }

  create() {
    // 添加背景
    this.add.image(400, 300, "background").setScale(1);

    // 显示说明文字
    this.add.text(400, 250, "Welcome to the Author Recognition Challenge！\n\nPress the Button to get started!", {
        fontSize: "24px",
        color: "#ffffff",
        align: "center",
        fontStyle: "bold",
      }).setOrigin(0.5);
      
      // 动态光晕文字
      const glowingText = this.add.text(400, 250, "Welcome to the Author Recognition Challenge！\n\nPress the Button to get started!", {
        fontSize: "24px",
        color: "#ffffff",
        align: "center",
        fontStyle: "bold",
      }).setOrigin(0.5)
        .setShadow(0, 0, "#ffe384", 20, true, true);
      
      // 光晕动态动画
      this.tweens.add({
        targets: glowingText.style,
        shadowBlur: { from: 0, to: 50 }, // 动态调整模糊半径
        duration: 5000, // 每次动画的时长
        ease: "Sine.easeInOut", // 使用平滑过渡效果
        yoyo: true, // 动画往返
        repeat: 1, // 无限循环
      });
      

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
