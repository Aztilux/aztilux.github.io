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

        // persistent audio element and handler refs
        this.audio = null;
        this._handlers = {
            timeupdate: this.updateTime.bind(this),
            loadedmetadata: this.updateDuration.bind(this)
        };
        this._domHandlers = {
            playClick: this.togglePlay.bind(this),
            prevClick: this.previousTrack.bind(this),
            nextClick: this.nextTrack.bind(this),
            seekInput: this.seek.bind(this)
        };
        this._listenersAttached = false;

        AudioPlayer.instance = this;
    }

    init() {
        // Create audio only once and reuse across route changes

        if (!this.audio) {
                this.audio = new Audio();
                this.audio.preload = 'metadata';
                // add audio event listeners once
                this.audio.addEventListener('timeupdate', this._handlers.timeupdate);
                this.audio.addEventListener('loadedmetadata', this._handlers.loadedmetadata);                
        }

        // If the DOM has changed, remove old listeners before reattaching.
        if (this._listenersAttached) {
            this.cleanup();
        }

        // Resolve DOM elements (may be re-mounted on route change)
        this.seekBar = document.getElementById('seek-bar');
        if (this.seekBar) this.seekBar.value = 0;
        this.currentTimeDisplay = document.getElementById('current-time');
        this.durationDisplay = document.getElementById('duration');
        this.playButton = document.getElementById('player_start');
        this.prevButton = document.getElementById('player_previous');
        this.nextButton = document.getElementById('player_next');

        // Attach DOM listeners to the current controls
        if (this.playButton && this.prevButton && this.nextButton && this.seekBar) {
            this.playButton.addEventListener('click', this._domHandlers.playClick);
            this.prevButton.addEventListener('click', this._domHandlers.prevClick);
            this.nextButton.addEventListener('click', this._domHandlers.nextClick);
            this.seekBar.addEventListener('input', this._domHandlers.seekInput);
            this._listenersAttached = true;
        }

        // Ensure UI reflects current track
        this.loadTrack(this.currentTrackIndex);

        // If audio already playing, keep it playing and update UI text
        if (this.isPlaying) {
            this.playButton && (this.playButton.textContent = 'pause');
            this.playButton && this.playButton.classList.remove('linear-wipe', 'bounce');
        } else {
            this.playButton && (this.playButton.textContent = 'play_arrow');
        }
    }

    cleanup() {
        // Only remove listeners if they were attached by this instance
        if (this._listenersAttached) {
            if (this.playButton) this.playButton.removeEventListener('click', this._domHandlers.playClick);
            if (this.prevButton) this.prevButton.removeEventListener('click', this._domHandlers.prevClick);
            if (this.nextButton) this.nextButton.removeEventListener('click', this._domHandlers.nextClick);
            if (this.seekBar) this.seekBar.removeEventListener('input', this._domHandlers.seekInput);
            this._listenersAttached = false;
        }

        // We keep the audio element itself persistent to avoid glitching. If you want full teardown,
        // call this._destroyAudio() explicitly on app unload.
    }

    // optional helper to fully destroy audio when app is being unloaded
    _destroyAudio() {
        if (this.audio) {
            this.audio.pause();
            this.audio.removeEventListener('timeupdate', this._handlers.timeupdate);
            this.audio.removeEventListener('loadedmetadata', this._handlers.loadedmetadata);
            this.audio.src = '';
            this.audio = null;
        }
    }

    loadTrack(index) {
        const track = this.tracks[index];
        if (!track) return;
        // Only set src if changed to avoid reloading and audio glitch
        const desiredSrc = new URL(track.src, location.href).href;
        if (this.audio.src !== desiredSrc) {
            this.audio.src = desiredSrc;
            this.audio.currentTime = 0;
        }
        const titleEl = document.getElementById('player_title');
        const authorEl = document.getElementById('player_author');
        const artEl = document.getElementById('player_art');
        if (titleEl) titleEl.textContent = track.title;
        if (authorEl) authorEl.textContent = track.artist;
        if (artEl) {
            const desiredArt = new URL(track.cover, location.href).href;
            if (artEl.src !== desiredArt) {
                artEl.src = desiredArt;
            }
        }
    }

    togglePlay() {
        this.playButton && this.playButton.classList.remove('linear-wipe', 'bounce');
        if (this.isPlaying) {
            this.audio.pause();
            this.playButton && (this.playButton.textContent = 'play_arrow');
        } else {
            this.audio.play();
            this.playButton && (this.playButton.textContent = 'pause');
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
        if (!this.seekBar || !this.audio.duration) return;
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
        if (!this.durationDisplay || !this.audio.duration) return;
        this.durationDisplay.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}