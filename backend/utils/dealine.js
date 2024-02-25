import mailSender from "./mail-send-code.js";

const taskDeadline = async () => {
  const today = new Date();
  // if it is 1:20 pm then send mail
  const mail = await mailSender(
    "shoaibisa1gdggdddse33@ail.com",
    "Task Deadline",
    "Task Deadline is near"
  );
  console.log("mail", mail);
};

export default taskDeadline;
