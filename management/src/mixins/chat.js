import * as signalR from "@microsoft/signalr";
export default {
  data() {
    return {
      connection: null,
      message: null,
      messages: [],
    };
  },
  created() {
    this.buildConnection();
    this.listenMessage();
    this.start();
  },
  methods: {
    buildConnection() {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/chat")
        .build();
    },
    listenMessage() {
      const _this = this;
      this.connection.on("broadcastMessage", function(message) {
        _this.createElements(message);
      });
    },
    createElements(message) {
      this.messages.push(message);
      let div = document.createElement("div");
      let br = document.createElement("br");
      this.setClasses(div);
      div.innerHTML = message;
      this.$refs.messageBoard.append(div);
      this.$refs.messageBoard.append(br);
    },
    setClasses(div) {
      const classes = [
        "badge",
        "badge-light",
        "d-block",
        "float-right",
        "mr-3",
      ];
      classes.forEach((e) => {
        div.classList.add(e);
      });
    },
    async start() {
      try {
        await this.connection.start().then(() => {
          this.connectionId = this.connection.connectionId;
        });
      } catch (err) {
        setTimeout(this.start, 5000);
      }
    },
    sendMessage() {
      if (!this.message) alert("尚未輸入訊息");
      this.connection.invoke(
        "SendMessageToUser",
        this.connectionId,
        this.message
      );
      this.message = null;
    },
  },
  computed: {},
  beforeRouteLeave(to, from, next) {
    this.connection.stop().then(() => {
      next();
    });
  },
};
