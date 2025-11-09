export class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTrackIndex = 0;
        this.tracks = [
            {
                title: "True Love",
                artist: "Carrion y Saske",
                src: "/assets/music/True Love.mp3",
                cover: "/assets/music/True Love.jpg"
            }
            // Add more tracks here
        ];
    }

    init() {
        // Get DOM elements
        this.seekBar = document.getElementById('seek-bar');
        this.currentTimeDisplay = document.getElementById('current-time');
        this.durationDisplay = document.getElementById('duration');
        this.playButton = document.getElementById('player_start');
        this.prevButton = document.getElementById('player_previous');
        this.nextButton = document.getElementById('player_next');

        // Set up event listeners
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.prevButton.addEventListener('click', () => this.previousTrack());
        this.nextButton.addEventListener('click', () => this.nextTrack());
        this.seekBar.addEventListener('input', () => this.seek());
        
        this.audio.addEventListener('timeupdate', () => this.updateTime());
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        
        // Load first track
        this.loadTrack(this.currentTrackIndex);
    }

    loadTrack(index) {
        const track = this.tracks[index];
        this.audio.src = track.src;
        document.getElementById('player_title').textContent = track.title;
        document.getElementById('player_author').textContent = track.artist;
        document.querySelector('img').src = track.cover;
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