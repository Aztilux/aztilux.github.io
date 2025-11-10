export class AudioPlayer {
    static instance

    static getInstance() {
        if (!AudioPlayer.instance) {
            AudioPlayer.instance = new AudioPlayer();
        }
        return AudioPlayer.instance;
    }

    constructor() {
        this.isPlaying = false;
        this.currentTrackIndex = 0;
        this.tracks = [
            {
                title: "Trance",
                artist: "Metro Boomin, Travis Scott & Young Thug",
                src: "/assets/music/Trance.mp3",
                cover: "/assets/music/Trance.jpg"
            },
            {
                title: "True Love",
                artist: "Carrion y Saske",
                src: "/assets/music/True Love.mp3",
                cover: "/assets/music/True Love.jpg"
            }
        ];

        AudioPlayer.instance = this;
    }

    init() {
        // Get DOM elements
        if (this.audio) {
            this.oldaudio = this.audio;
        }
        this.audio = new Audio();
        console.log(this.isPlaying)
        this.seekBar = document.getElementById('seek-bar');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.durationDisplay = document.getElementById('duration');
        this.playButton = document.getElementById('player_start');
        this.prevButton = document.getElementById('player_previous');
        this.nextButton = document.getElementById('player_next');

        // Set up event listeners
        if (this.playButton && this.prevButton && this.nextButton && this.seekBar) {
            this.playButton.addEventListener('click', () => this.togglePlay());
            this.prevButton.addEventListener('click', () => this.previousTrack());
            this.nextButton.addEventListener('click', () => this.nextTrack());
            this.seekBar.addEventListener('input', () => this.seek());
            this.audio.addEventListener('timeupdate', () => this.updateTime());
            this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
            this.loadTrack(this.currentTrackIndex);
        } else {
            this.cleanup();
        }

        if (this.isPlaying == true) {
            this.audio.addEventListener('loadedmetadata', () => {
                this.audio.currentTime = this.oldaudio.currentTime;
                this.audio.play();
                this.oldaudio.pause(); // keeps full fractional precision
            });
            this.playButton.textContent = 'pause';
            this.playButton.classList.remove('linear-wipe', 'bounce');
        }
        
    }

    cleanup() {
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            if (this.playButton) this.playButton.removeEventListener('click', () => this.togglePlay());
            if (this.prevButton) this.prevButton.removeEventListener('click', () => this.previousTrack());
            if (this.nextButton) this.nextButton.removeEventListener('click', () => this.nextTrack());
            if (this.seekBar) this.seekBar.removeEventListener('input', () => this.seek());
            this.audio.removeEventListener('timeupdate', () => this.updateTime());
            this.audio.removeEventListener('loadedmetadata', () => this.updateDuration());
    }

    loadTrack(index) {
        const track = this.tracks[index];
        this.audio.src = track.src;
        this.audio.currentTime = 0;
        document.getElementById('player_title').textContent = track.title;
        document.getElementById('player_author').textContent = track.artist;
        document.getElementById('player_art').src = track.cover;
    }

    togglePlay() {
        this.playButton.classList.remove('linear-wipe', 'bounce');
        if (this.isPlaying) {
            this.audio.pause();
            this.playButton.textContent = 'play_arrow';
        } else {
            this.audio.play();
            this.playButton.textContent = 'pause';
        }
        this.isPlaying = !this.isPlaying;
    }

    previousTrack() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) this.audio.play();
    }

    nextTrack() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) this.audio.play();
    }

    seek() {
        const time = (this.seekBar.value * this.audio.duration) / 100;
        this.audio.currentTime = time;
    }

    updateTime() {
        if (!this.seekBar || !this.currentTimeDisplay || !this.audio.duration) return;
        
        const percent = (this.audio.currentTime / this.audio.duration) * 100;
        this.seekBar.value = percent;
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
    }

    updateDuration() {
        this.durationDisplay.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}