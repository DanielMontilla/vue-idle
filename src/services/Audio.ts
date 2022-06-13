const play = (name: string) => {
   new Audio(`src/assets/sounds/${name}.mp3`).play();
};

const playRandom = (name: string) => {};

const useAudio = () => ({
   play,
});

export default useAudio;
