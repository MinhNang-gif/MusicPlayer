/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / Pause / Seek 
 * 4. CD rotate 
 * 5. Next / prev 
 * 6. Random 
 * 7. Next / Repeat When ended 
 * 8. Active song
 * 9. Scroll active song into view 
 * 10. Play song when click 
 */


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const cd = $('.cd');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');
const endTime = $('.end_time');
const currentTime = $('.current-time');


const app = {
    currentIndex: 0,

    isPlaying: false,

    isRandom: false,

    isRepeat: false,
    
    songs: [
        {
            name: 'Dù cho tận thế', 
            singer: 'Erik', 
            path: './assets/music/DuChoTanThe.mp3',
            image: './assets/img/DuChoTanThe.png',
        }, 
        {
            name: 'Ngược chiều yêu', 
            singer: 'Anh Tú', 
            path: './assets/music/NguocChieuYeu.mp3',
            image: './assets/img/NguocChieuYeu.png',
        }, 
        {
            name: 'Vì yêu nhớ', 
            singer: 'Anh Tú - Lâm Bảo Ngọc', 
            path: './assets/music/ViYeuLaNho.mp3',
            image: './assets/img/ViYeuLaNho.png',
        }, 
        {
            name: 'Lời yêu em', 
            singer: 'Vũ', 
            path: './assets/music/LoiYeuEm.mp3',
            image: './assets/img/LoiYeuEm.png',
        }, 
        {
            name: 'Vài câu nói có khiển người thay đổi', 
            singer: 'GREY D x tlinh', 
            path: './assets/music/VaiCauNoiCoKhienNguoiThayDoi.mp3',
            image: './assets/img/VaiCauNoiCoKhienNguoiThayDoi.png',
        }, 
        {
            name: 'Bầu trời mới', 
            singer: 'Minh Tốc & Lam', 
            path: './assets/music/BauTroiMoi.mp3',
            image: './assets/img/BauTroiMoi.png',
        }, 
        {
            name: 'Mất kết nối', 
            singer: 'Dương Domic', 
            path: './assets/music/MatKetNoi.mp3',
            image: './assets/img/MatKetNoi.png',
        },
        {
            name: 'Giờ thì', 
            singer: 'Bùi Trương Linh', 
            path: './assets/music/GioThi.mp3',
            image: './assets/img/GioThi.png',
        },
        {
            name: 'Tự em thương mình', 
            singer: 'Hương Ly', 
            path: './assets/music/TuEmThuongMinh.mp3',
            image: './assets/img/TuEmThuongMinh.png',
        },
        {
            name: 'Thật tốt khi anh có em', 
            singer: 'Anh Tú', 
            path: './assets/music/ThatTotKhiAnhCoEm.mp4',
            image: './assets/img/ThatTotKhiAnhCoEm.png',
        },
        {
            name: 'Tràn bộ nhớ', 
            singer: 'Dương Domic', 
            path: './assets/music/TranBoNho.mp3',
            image: './assets/img/TranBoNho.png',
        },
        {
            name: 'Ta là của nhau', 
            singer: 'Đông Nhi', 
            path: './assets/music/TaLaCuaNhau.mp3',
            image: './assets/img/TaLaCuaNhau.png',
        },
        {
            name: 'Răng khôn', 
            singer: 'Phí Phương Anh', 
            path: './assets/music/RangKhon.mp3',
            image: './assets/img/RangKhon.png',
        },
        {
            name: 'Exit sign', 
            singer: 'Hiếu Thứ Hai', 
            path: './assets/music/ExitSign.mp3',
            image: './assets/img/ExitSign.png',
        },
        {
            name: 'NoLoveNoLife', 
            singer: 'Hiếu Thứ Hai', 
            path: './assets/music/NoLoveNoLife.mp3',
            image: './assets/img/NoLoveNoLife.png',
        },
    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        });
        const playlist = $('.playlist');
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function() {
        // Object.defineProperty(obj, prop, des): (doi tuong de xac dinh thuoc tinh, thuoc tinh, mo ta thuoc tinh)
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        }) // bay gio obj app da co them thuoc tinh currentSong
    },

    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Xu ly CD quay / dung 
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds 
            iterations: Infinity, // lap lai vo han 
        })
        cdThumbAnimate.pause();

        // Xu ly khi phong to / thu nho CD
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xu ly khi click play 
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }  
        }

        // Khi song duoc play 
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi song bi pause 
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tien do bai hat thay doi 
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;

                // Cập nhật thời gian hiện tại
                const currentMinutes = Math.floor(audio.currentTime / 60);
                const currentSeconds = Math.floor(audio.currentTime % 60);
                currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
            }
        }

        // Xu ly khi tua song 
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value; // tinh ra so giay 
            audio.currentTime = seekTime;
        }

        // Khi next song 
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            }
            else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            }
            else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Xu ly bat / tat random song 
        randomBtn.onclick = function() {
            if (_this.isRandom) {
                _this.isRandom = false;
                randomBtn.classList.remove('active');
            }
            else {
                _this.isRandom = true;
                randomBtn.classList.add('active');
            }
        }

        // Xu ly next song khi audio ended 
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        }

        // Xu ly bat / tat repeat song 
        repeatBtn.onclick = function() {
            if (_this.isRepeat) {
                _this.isRepeat = false;
                repeatBtn.classList.remove('active');
            }
            else {
                _this.isRepeat = true;
                repeatBtn.classList.add('active');
            }
        }

        // Lang nghe hanh vi click vao playlist 
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) { // closest tim phan tu cha gan nhat (hoac chinh no)
                // xu ly khi click vao song 
                if (songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data-index'));
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                // xu ly khi click vao song option 
                if (e.target.closest('.option')) {
                    
                }
            }
        }

        // Xu ly hien thi thoi luong bai hat 
        audio.onloadedmetadata = function() { // dung su kien loadedmetadata de khac phuc tinh trang khi trang vua tai, trinh duyet co the chua doc kip metadata cua file audio
            // Tong thoi luong bai hat 
            const totalSeconds = audio.duration;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
            endTime.textContent = `${minutes}:${seconds}`;

            // Thoi gian thuc cua bai hat 
            const currentMinutes = Math.floor(audio.currentTime / 60);
            const currentSeconds = Math.floor(audio.currentTime % 60);
            currentTime.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
        }
    },

    scrollToActiveSong: function() {
        const activeSong = $('.song.active');
        setTimeout(() => {
            activeSong.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }, 300)
    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name; 
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function() {
        let newIndex; 

        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex); // random lai khi no van con trung bai cu 

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        // dinh nghia cac thuoc tinh cho object
        this.defineProperties();

        // lang nghe / xu ly cac su kien 
        this.handleEvents();

        // tai thong tin bai hat dau tien vao UI khi chay ung dung 
        this.loadCurrentSong();

        // render playlist
        this.render();
    }
}

app.start();