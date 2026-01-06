
import { Genre } from './types';

export const GENRE_DATA: Genre[] = [
    { id: 1, name: "Lo-fi Hip Hop", category: "Standard", desc: "차분한 비트와 부드러운 재즈 화성이 특징입니다.", attr: [7, 8, 3, 9, 4], tags: ["Chill", "Study", "Jazz"], 
      prompts: [
        { text: "lo-fi hip hop, jazzy chords, rainy day atmosphere, vinyl crackle", desc: "비 오는 날의 감성적인 재즈 힙합" },
        { text: "chill lo-fi, soft piano melody, slow tempo, relaxing vibe", desc: "편안한 피아노 선율의 휴식용 비트" },
        { text: "lofi hiphop, nocturnal, city lights, muted trumpet, smooth bass", desc: "도시의 야경과 어울리는 차분한 무드" },
        { text: "study beats, lofi, organic textures, bird chirping, warm pads", desc: "공부할 때 듣기 좋은 자연적인 질감" },
        { text: "lofi jazz hop, saxophone, dusty drums, nostalgic, sunset", desc: "노스탤지어 무드" },
        { text: "chillhop, electric piano, boom bap drums, relaxed, mellow", desc: "여유로운 칠홉 스타일" }
      ] 
    },
    { id: 2, name: "Synthwave", category: "Standard", desc: "80년대 복고풍 사운드와 네온 감성 장르입니다.", attr: [8, 10, 1, 9, 6], tags: ["Retro", "80s", "Cyberpunk"], 
      prompts: [
        { text: "80s synthwave, retro-futuristic, analog synths, driving beat", desc: "80년대 미래주의 감성" },
        { text: "dreamy chillwave, hazy synths, nostalgic, slow tempo", desc: "몽환적인 사운드" },
        { text: "outrun, neon nights, fast electronic drums, arpeggiated bass", desc: "네온 사인을 가르는 드라이브" },
        { text: "dark synthwave, horror movie style, deep bass, aggressive synths", desc: "어두운 복고풍 호러" },
        { text: "vaporwave style, chopped and screwed, elevator music remix", desc: "기괴한 베이퍼웨이브" },
        { text: "synthwave disco, funky, dancing, 80s pop, bright", desc: "밝은 신스 팝 디스코" }
      ]
    },
    { id: 3, name: "Hard Rock", category: "Standard", desc: "강력한 기타 리프와 파워풀한 드럼이 특징입니다.", attr: [10, 2, 4, 5, 7], tags: ["Heavy", "Energy", "Riff"], 
      prompts: [
        { text: "hard rock, heavy distorted guitar riffs, powerful drums", desc: "클래식하고 강력한 리프" },
        { text: "modern hard rock, drop-D tuning, punchy production", desc: "현대적인 사운드" },
        { text: "stadium rock, anthem, cheering crowd, soaring guitar solo", desc: "웅장한 경기장 록" },
        { text: "blues rock, crunchy guitar, gravelly vocals, steady beat", desc: "거친 보컬과 블루지한 기타" },
        { text: "70s hard rock, vintage tube amp sound, cowbell, driving bass", desc: "빈티지한 70년대 록" },
        { text: "grunge style, raw energy, distorted, melancholic verses", desc: "너바나 스타일의 그런지" }
      ]
    },
    { id: 101, name: "K-Pop: Newjeans Style", category: "K-POP", desc: "뉴트로와 UK 개러지 비트가 섞인 미니멀한 팝입니다.", attr: [6, 7, 4, 9, 5], tags: ["Newtro", "UK Garage", "Chill"], 
      prompts: [
        { text: "k-pop, Newjeans style, UK garage beat, jersey club, nostalgic", desc: "청량하고 미니멀한 이지리스닝" },
        { text: "y2k pop, 90s aesthetic, drum and bass lite, airy vocals", desc: "Y2K 감성의 몽환적 댄스곡" },
        { text: "lo-fi kpop, soft synths, muted drums, teenage dream atmosphere", desc: "나른하고 감성적인 하이틴 무드" },
        { text: "rhythmic k-pop, 2-step garage, clean production, catchy hook", desc: "세련된 리듬감의 트렌디한 팝" },
        { text: "summer breeze kpop, light synth, acoustic guitar pluck, refreshing", desc: "여름 바람처럼 시원한 곡" },
        { text: "minimalist kpop pop, deep house influence, chic, effortless", desc: "절제된 미학의 시크한 스타일" }
      ]
    },
    { id: 102, name: "K-Pop: Aespa Style", category: "K-POP", desc: "하이퍼팝과 메탈릭한 사운드의 SMP 스타일입니다.", attr: [10, 10, 1, 6, 9], tags: ["Hyperpop", "Cyberpunk", "Powerful"], 
      prompts: [
        { text: "k-pop, aespa style, aggressive synth, metallic texture, futuristic", desc: "쇠맛 나는 강력한 하이퍼팝" },
        { text: "dark k-pop, glitchy edm, heavy distortion, dramatic bridge", desc: "사이버네틱한 걸크러쉬 곡" },
        { text: "kwangya theme, cinematic electronic, mysterious intro, huge bass", desc: "신비로운 광야 세계관 음악" },
        { text: "techno-pop kpop, hard hitting kicks, robotic vocal layers, intense", desc: "기계적이고 강렬한 테크노 팝" },
        { text: "experimental kpop, complex structure, hyperpop elements", desc: "실험적이고 에너지 넘치는 사운드" },
        { text: "virtual diva style, vocaloid influence, fast bpm, digital world", desc: "디지털 감성 미래형 팝" }
      ]
    },
    { id: 103, name: "K-Pop: IVE Style", category: "K-POP", desc: "우아하고 화려한 멜로디의 나르시시즘 팝입니다.", attr: [8, 7, 3, 7, 7], tags: ["Elegant", "Royal", "Chic"], 
      prompts: [
        { text: "k-pop, IVE style, elegant pop, classy strings, glamorous disco", desc: "우아하고 화려한 공주풍 댄스" },
        { text: "majestic k-pop, royal aesthetic, chic vocals, clean production", desc: "도도하고 세련된 틴프레시" },
        { text: "narcissistic pop, confident aura, catchy chorus, stylish", desc: "자신감 넘치는 세련된 분위기" },
        { text: "romantic disco kpop, sparkly synths, funky bass, dreamy vocals", desc: "반짝이는 신스와 디스코의 만남" },
        { text: "chic k-pop, rhythmic guitar, luxury vibe, high teen queen", desc: "럭셔리하고 시크한 하이틴 퀸" },
        { text: "sophisticated dance kpop, string stabs, modern pop, graceful", desc: "우아한 현악 댄스 팝" }
      ]
    }
];

// Add dummy data for other genres mentioned to reach a good list if needed
// (I will condense the full list from user input into this structure)
// To keep it clean, I'll export the primary data structure
