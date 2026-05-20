import React, { useState } from "react";
import emailjs from "emailjs-com";

import styles from "./Hero.module.css";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EmailIcon from '@mui/icons-material/Email';
import { getImageUrl } from "../../utils";

export const Hero = () => {

  const [showDialog, setShowDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [downloading, setDownloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    setDownloading(true);

    try {
      // Send mail to you using EmailJS
      await emailjs.send(
        "service_re0cpbq",
        "template_w13u352",
        { from_email: email },
        "FFcmB_3uYwjZb_JCc"
      );

      // Trigger the download
      const link = document.createElement("a");
      link.href = "/Resume_Suman_Saurav.pdf";
      link.download = "Resume_Suman_Saurav.pdf";
      link.click();

      // alert("Resume downloading... Notification sent ✅");
      setShowDialog(false);
      setEmail("");
    } catch (error) {
      console.error(error);
      // alert("Error sending notification. Please try again.");
    } finally {
      setDownloading(false);
    }
  };



  return (
    <>
      <section className={styles.container}>
        <img
          src={getImageUrl("hero/Suman.png")}
          alt="Suman Saurav"
          className={styles.heroImg}
          onContextMenu={(e) => e.preventDefault()}  // disable right-click
          draggable="false"
        />
        <div className={styles.content}>
          <h1 className={styles.title}>Hi, I'm Suman Saurav</h1>
          <p className={styles.description}>
            I'm a passionate Software Developer with over 3.5 years of experience building dynamic,
            user-focused web applications using React, JavaScript, TypeScript, HTML, and CSS.
            I enjoy crafting clean, efficient, and scalable front-end solutions that bring great design
            and functionality together. Always open to connecting and exploring exciting opportunities
            — feel free to reach out!
          </p>
          <div className={styles.contactContent}>

            <a
              className={styles.contactBtn}
              onClick={() => setShowDialog(true)}
            >
              <FileDownloadIcon />Resume
            </a>
            <a href="mailto:sumansaurav1121@outlook.com" className={styles.contactBtn}>
              <EmailIcon />Contact Me
            </a>
          </div>
        </div>

        <div className={styles.topBlur} />
        <div className={styles.bottomBlur} />
      </section>
      {showDialog && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h3>Enter your email to download resume</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={downloading}>
                {downloading ? "Processing..." : "Download Resume"}
              </button>
            </form>
            <button onClick={() => setShowDialog(false)} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>

  );
};
