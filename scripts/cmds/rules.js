const { getPrefix } = global.utils;

module.exports = {
  config: {
    name: "rules",
    version: "1.7",
    author: "NTKhang",
    countDown: 5,
    role: 0,
    description: {
      vi: "Tạo/xem/thêm/sửa/đổi vị trí/xóa nội quy nhóm của bạn",
      en: "Create/view/add/edit/change position/delete group rules of you"
    },
    category: "box chat",
    guide: {
      vi: "   {pn} [add | -a] <nội quy muốn thêm>: thêm nội quy cho nhóm. 📜"
        + "\n   {pn}: xem nội quy của nhóm. 👀"
        + "\n   {pn} [edit | -e] <n> <nội dung sau khi sửa>: chỉnh sửa lại nội quy thứ n. ✏️"
        + "\n   {pn} [move | -m] <stt1> <stt2> hoán đổi vị trí của nội quy thứ <stt1> và <stt2> với nhau. 🔄"
        + "\n   {pn} [delete | -d] <n>: xóa nội quy theo số thứ tự thứ n. ❌"
        + "\n   {pn} [remove | -r]: xóa tất cả nội quy của nhóm. 🗑️"
        + "\n"
        + "\n   Ví dụ:"
        + "\n    {pn} add không spam 📛"
        + "\n    {pn} move 1 3 ↔️"
        + "\n    {pn} -e 1 không spam tin nhắn trong nhóm ✉️"
        + "\n    {pn} -r 🚮",
      en: "   {pn} [add | -a] <rule to add>: add rule for group. 📜"
        + "\n   {pn}: view group rules. 👀"
        + "\n   {pn} [edit | -e] <n> <content after edit>: edit rule number n. ✏️"
        + "\n   {pn} [move | -m] <stt1> <stt2> swap position of rule number <stt1> and <stt2>. 🔄"
        + "\n   {pn} [delete | -d] <n>: delete rule number n. ❌"
        + "\n   {pn} [remove | -r]: delete all rules of group. 🗑️"
        + "\n"
        + "\n   Example:"
        + "\n    {pn} add don't spam 📛"
        + "\n    {pn} move 1 3 ↔️"
        + "\n    {pn} -e 1 don't spam message in group ✉️"
        + "\n    {pn} -r 🚮"
    }
  },

  langs: {
    vi: {
      yourRules: "Nội quy của nhóm bạn\n%1",
      noRules: "Hiện tại nhóm bạn chưa có bất kỳ nội quy nào, để thêm nội quy cho nhóm hãy sử dụng %1rules add",
      noPermissionAdd: "Chỉ quản trị viên mới có thể thêm nội quy cho nhóm",
      noContent: "Vui lòng nhập nội dung cho nội quy bạn muốn thêm",
      success: "Đã thêm nội quy mới cho nhóm thành công ✅",
      noPermissionEdit: "Chỉ quản trị viên mới có thể chỉnh sửa nội quy nhóm",
      invalidNumber: "Vui lòng nhập số thứ tự của quy định bạn muốn chỉnh sửa",
      rulesNotExist: "Không tồn tại nội quy thứ %1",
      numberRules: "Hiện tại nhóm bạn chỉ có %1 nội quy được đặt ra",
      noContentEdit: "Vui lòng nhập nội dung bạn muốn thay đổi cho nội quy thứ %1",
      successEdit: "Đã chỉnh sửa nội quy thứ %1 thành: %2 ✏️",
      noPermissionMove: "Chỉ quản trị viên mới có thể đổi vị trí nội quy của nhóm",
      invalidNumberMove: "Vui lòng nhập số thứ tự của 2 nội quy nhóm bạn muốn chuyển đổi vị trí với nhau",
      sameNumberMove: "Không thể chuyển đổi vị trí của 2 nội quy giống nhau",
      rulesNotExistMove2: "Không tồn tại nội quy thứ %1 và %2",
      successMove: "Đã chuyển đổi vị trí của 2 nội quy thứ %1 và %2 thành công 🔄",
      noPermissionDelete: "Chỉ quản trị viên mới có thể xóa nội quy của nhóm",
      invalidNumberDelete: "Vui lòng nhập số thứ tự của nội quy bạn muốn xóa",
      rulesNotExistDelete: "Không tồn tại nội quy thứ %1",
      successDelete: "Đã xóa nội quy thứ %1 của nhóm, nội dung: %2 ❌",
      noPermissionRemove: "Chỉ có quản trị viên nhóm mới có thể xoá bỏ tất cả nội quy của nhóm",
      confirmRemove: "⚠️ Thả cảm xúc bất kỳ vào tin nhắn này để xác nhận xóa toàn bộ nội quy của nhóm",
      successRemove: "Đã xóa toàn bộ nội quy của nhóm thành công 🗑️",
      invalidNumberView: "Vui lòng nhập số thứ tự của nội quy bạn muốn xem"
    },
    en: {
      yourRules: "Your group rules\n%1",
      noRules: "Your group has no rules, to add rules for group use %1rules add",
      noPermissionAdd: "Only admins can add rules for group",
      noContent: "Please enter the content for the rule you want to add",
      success: "Added new rule for group successfully ✅",
      noPermissionEdit: "Only admins can edit group rules",
      invalidNumber: "Please enter the number of the rule you want to edit",
      rulesNotExist: "Rule number %1 does not exist",
      numberRules: "Your group only has %1 rules",
      noContentEdit: "Please enter the content you want to change for rule number %1",
      successEdit: "Edited rule number %1 to: %2 ✏️",
      noPermissionMove: "Only admins can move group rules",
      invalidNumberMove: "Please enter the number of 2 group rules you want to swap",
      sameNumberMove: "Cannot swap position of 2 same rules",
      rulesNotExistMove2: "Rule number %1 and %2 does not exist",
      successMove: "Swapped position of rule number %1 and %2 successfully 🔄",
      noPermissionDelete: "Only admins can delete group rules",
      invalidNumberDelete: "Please enter the number of the rule you want to delete",
      rulesNotExistDelete: "Rule number %1 does not exist",
      successDelete: "Deleted rule number %1 of group, content: %2 ❌",
      noPermissionRemove: "Only group admins can remove all group rules",
      confirmRemove: "⚠️ React to this message with any emoji to confirm remove all group rules",
      successRemove: "Removed all group rules successfully 🗑️",
      invalidNumberView: "Please enter the number of the rule you want to view"
    }
  },

  onStart: async function ({ role, args, message, event, threadsData, getLang, commandName }) {
    const { threadID, senderID } = event;

    const type = args[0];
    const rulesOfThread = await threadsData.get(threadID, "data.rules", []);
    const totalRules = rulesOfThread.length;

    // Define some default rules
    const defaultRules = [
      "No spamming. 📛",
      "Be respectful to others. 🙏",
      "No offensive language. 🚫",
      "No advertising or self-promotion. 📢",
      "Follow the Discord Community Guidelines. 📖"
    ];

    if (!type) {
      let i = 1;
      const msg = rulesOfThread.reduce((text, rules) => text += ${i++}. ${rules}\n, "");
      message.reply(msg ? getLang("yourRules", msg) : getLang("noRules", getPrefix(threadID)), (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName,
          author: senderID,
          rulesOfThread,
          messageID: info.messageID
        });
      });
    }
    else if (["add", "-a"].includes(type)) {
      if (role < 1)
        return message.reply(getLang("noPermissionAdd"));
      if (!args[1]) {
        return message.reply(getLang("noContent"));
      }
      rulesOfThread.push(args.slice(1).join(" "));
      try {
        await threadsData.set(threadID, rulesOfThread, "data.rules");
        message.reply(getLang("success"));
      }
      catch (err) {
        message.err(err);
      }
    }
    else if (["edit", "-e"].includes(type)) {
      if (role < 1)
        return message.reply(getLang("noPermissionEdit"));
      const stt = parseInt(args[1]);
      if (isNaN(stt))
        return message.reply(getLang("invalidNumber"));
      if (!rulesOfThread[stt - 1])
        return message.reply(${getLang("rulesNotExist", stt)}, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)});
      if (!args[2])
        return message.reply(getLang("noContentEdit", stt));
      const newContent = args.slice(2).join(" ");
      rulesOfThread[stt - 1] = newContent;
      try {
        await threadsData.set(threadID, rulesOfThread, "data.rules");
        message.reply(getLang("successEdit", stt, newContent));
      }
      catch (err) {
        message.err(err);
      }
    }
    else if (["move", "-m"].includes(type)) {
      if (role < 1)
        return message.reply(getLang("noPermissionMove"));
      const num1 = parseInt(args[1]);
      const num2 = parseInt(args[2]);
      if (isNaN(num1) || isNaN(num2))
        return message.reply(getLang("invalidNumberMove"));
      if (!rulesOfThread[num1 - 1] || !rulesOfThread[num2 - 1]) {
        let msg = !rulesOfThread[num1 - 1] ?
          !rulesOfThread[num2 - 1] ?
            message.reply(getLang("rulesNotExistMove2", num1, num2)) :
            message.reply(getLang("rulesNotExistMove", num1)) :
          message.reply(getLang("rulesNotExistMove", num2));
        msg += , ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)};
        return;
      }
      if (num1 === num2)
        return message.reply(getLang("sameNumberMove"));
      // Swap positions
      [rulesOfThread[num1 - 1], rulesOfThread[num2 - 1]] = [rulesOfThread[num2 - 1], rulesOfThread[num1 - 1]];
      try {
        await threadsData.set(threadID, rulesOfThread, "data.rules");
        message.reply(getLang("successMove", num1, num2));
      }
      catch (err) {
        message.err(err);
      }
    }
    else if (["delete", "-d"].includes(type)) {
      if (role < 1)
        return message.reply(getLang("noPermissionDelete"));
      const stt = parseInt(args[1]);
      if (isNaN(stt))
        return message.reply(getLang("invalidNumberDelete"));
      if (!rulesOfThread[stt - 1])
        return message.reply(${getLang("rulesNotExistDelete", stt)}, ${totalRules == 0 ? getLang("noRules") : getLang("numberRules", totalRules)});
      const ruleDeleted = rulesOfThread.splice(stt - 1, 1);
      try {
        await threadsData.set(threadID, rulesOfThread, "data.rules");
        message.reply(getLang("successDelete", stt, ruleDeleted));
      }
      catch (err) {
        message.err(err);
      }
    }
    else if (["remove", "-r"].includes(type)) {
      if (role < 1)
        return message.reply(getLang("noPermissionRemove"));
      global.GoatBot.onReply.set(message.messageID, {
        commandName,
        author: senderID,
        rulesOfThread,
        messageID: message.messageID
      });
      message.reply(getLang("confirmRemove"));
    }
    else {
      message.reply(getLang("invalidCommand"));
    }
  }
};