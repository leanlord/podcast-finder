export const getAudioDuration = (file) => {
  const reader = new FileReader();
  const audio = document.createElement("audio");
  reader.readAsDataURL(file);
  return new Promise((resolve) => {
    reader.onload = (e) => {
      audio.src = e.target.result;
      audio.addEventListener("durationchange", () => {
        resolve(Math.ceil(audio.duration));
      });
    };
  });
};
