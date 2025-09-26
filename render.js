// renderer.js
class MailBoxApp {
  constructor() {
    this.currentPage = "inbox";
    this.emails = [];
    this.selectedEmails = [];
    this.isLoading = false;

    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadInitialData();
    this.showPage("inbox");
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page") || "inbox";
        this.showPage(page);
      });
    });

    // Search
    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchEmails(e.target.value);
      });
    }

    // Select All
    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
      selectAll.addEventListener("change", (e) => {
        this.selectAllEmails(e.target.checked);
      });
    }

    // Listen to events from main
    window.electronAPI.onShowCompose(() => this.showPage("compose"));
    window.electronAPI.onNavigateTo((page) => this.showPage(page));
  }

  async loadInitialData() {
    try {
      const savedEmails = await window.electronAPI.getAppData("emails");
      if (savedEmails?.length) {
        this.emails = savedEmails;
      } else {
        this.emails = this.generateSampleEmails();
        await this.saveEmails();
      }
      this.renderEmails();
    } catch (err) {
      console.error("Error loading emails:", err);
    }
  }

  async saveEmails() {
    await window.electronAPI.setAppData("emails", this.emails);
  }

  generateSampleEmails() {
    return [
      {
        id: 1,
        sender: "John Smith",
        subject: "Quarterly Report Review",
        preview: "Hi team, I've completed the quarterly report...",
        time: "2 min ago",
        unread: true,
        starred: false,
      },
      {
        id: 2,
        sender: "Maria Johnson",
        subject: "Project Updates & Next Steps",
        preview: "Good morning! I wanted to update you on the project...",
        time: "15 min ago",
        unread: true,
        starred: true,
      },
    ];
  }

  showPage(page) {
    document.querySelectorAll(".page").forEach((el) => el.classList.remove("active"));
    const target = document.getElementById(page + "Page");
    if (target) {
      target.classList.add("active");
      this.currentPage = page;
    }
  }

  renderEmails(emails = this.emails) {
    const list = document.getElementById("emailList");
    if (!list) return;

    list.innerHTML = emails
      .map(
        (email) => `
      <div class="email-item ${email.unread ? "unread" : ""}" data-email-id="${email.id}">
        <input type="checkbox" class="email-checkbox" />
        <span class="email-sender">${email.sender}</span>
        <span class="email-subject">${email.subject}</span>
        <span class="email-time">${email.time}</span>
      </div>
    `
      )
      .join("");
  }

  searchEmails(query) {
    const filtered = this.emails.filter(
      (e) =>
        e.sender.toLowerCase().includes(query.toLowerCase()) ||
        e.subject.toLowerCase().includes(query.toLowerCase())
    );
    this.renderEmails(filtered);
  }

  selectAllEmails(checked) {
    document.querySelectorAll(".email-checkbox").forEach((c) => (c.checked = checked));
  }
}
function openCompose() {
  console.log("Navigating to compose.html");
  window.location.href = "compose.html";
}

window.addEventListener("DOMContentLoaded", () => {
  new MailBoxApp();
});
