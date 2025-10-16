import styles from "./TravelMedia.module.css";

function TravelMedia() {
    const videoUrl = "https://getsamplefiles.com/download/mp4/sample-3.mp4";
    const audioUrl = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";

    return (
        <div className={styles['travel-media-body']}>
            <h1 className={styles.header}>Travel Media</h1>
            <video className={styles.video} src={videoUrl} controls preload="metadata">Your browser does not support the video tag.</video>
            <audio className={styles.audio} src={audioUrl} controls preload="metadata">Your browser does not support the audio tag.</audio>
        </div>
    )
}

export default TravelMedia;