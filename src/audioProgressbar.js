gsap.registerPlugin(Draggable, MotionPathPlugin);
const audioProgressbar = {
    self: null, // pointer to self [audioProgressbar] to fix 'this' binding issue.
    container: null,
    audio: null,
    audioDuration: 0,
    timeline: null,
    path: null,
    pathOverlay: null,
    overlayLength: 0,
    dot: null,
    init: (containerEl, audioEl, curveEl, dotEl) => {
        self = audioProgressbar;
        self.container = document.getElementById(containerEl);
        self.audioInit(audioEl);
        self.draggableInit(curveEl, dotEl);
        self.progressPathInit();
        self.renderPath();
    },
    audioInit: (audioEl) => {
        self.audio = document.getElementById(audioEl);
        self.audio.addEventListener('loadedmetadata', () => {
            self.audioDuration = self.audio.duration;
        });
        self.audio.ontimeupdate = () => {
            let percentage = self.audio.currentTime / self.audio.duration;
            self.timeline.progress(percentage);
            self.renderPath(percentage);
        }
    },
    draggableInit: (curveEl, dotEl) => {
        self.path = document.querySelector(curveEl);
        self.dot = document.querySelector(dotEl);
        let bounds = self.path.getBBox();
        let clamp = gsap.utils.clamp(0, 1);
        let prevProgress = 0;

        self.timeline = gsap.timeline({paused: true})
            .to(self.dot, {
                motionPath: {
                    path: self.path,
                    align: self.path,
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                }, immediateRender: true, ease: "none"
            })

        Draggable.create(self.dot, {
            type: "x",
            onDrag: function () {
                let progress = clamp((this.x - bounds.x) / bounds.width);
                if (progress !== prevProgress) {
                    self.timeline.progress(progress);
                    self.audio.currentTime = progress * self.audioDuration;
                    prevProgress = progress;
                    self.renderPath(progress);
                } else {
                    return false;
                }
            }
        });
    },
    progressPathInit: () => {
        let curveOverlay = self.path.cloneNode(true);
        curveOverlay.id = self.path.id + '-overlay';
        curveOverlay.style.strokeWidth = 3;
        self.path.after(curveOverlay);
        self.pathOverlay = document.getElementById(curveOverlay.id);
        self.overlayLength = self.pathOverlay.getTotalLength();
        self.pathOverlay.style.strokeDasharray = self.overlayLength + ' ' + self.overlayLength;
        self.pathOverlay.style.strokeDashoffset = self.overlayLength;
    },
    renderPath: (percentage) => {
        let length = self.overlayLength * percentage;
        self.pathOverlay.style.strokeDashoffset = self.overlayLength - length;
    },
    convertTime: (inputSeconds) => {
        let seconds = Math.floor(inputSeconds % 60);
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        let minutes = Math.floor(inputSeconds / 60);
        return minutes + ":" + seconds
    }
};
audioProgressbar.init('audio-container', 'podcast-audio', '#curve', '#dot');
