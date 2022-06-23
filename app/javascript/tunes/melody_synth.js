import * as Tone from 'tone'
import { generateUniqId } from '../utilities'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0.05,
    attackCurve: 'exponential',
    decay: 0.2,
    decayCurve: 'exponential',
    sustain: 0.2,
    release: 1.5,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'fatsine',
    modulationType: 'sine',
    phase: 0,
    harmonicity: 0.5
  }
}

// const chebyshevSettings = {
//   wet: 0,
//   order: 50,
//   oversample: 'none'
// }

const pingPongDelaySettings = {
  pingpong: 0,
  delayTime: 0.25,
  maxDelayTime: 1
}

const autoWahSettings = {
  pedal: 0,
  baseFrequency: 100,
  octaves: 6,
  sensitivity: 0,
  Q: 2,
  gain: 2,
  follower: 0.1
}

const channelSettings = {
  volume: -14,
  pan: 0
}

const freeverbSettings = {
  wet: 0.55,
  roomSize: 0.23,
  dampening: 40
}

// const tremoloSettings = {
//   wet: 0,
//   frequency: 10,
//   type: 'sine',
//   depth: 0.5,
//   spread: 180
// }

// const chebyshevNode = new Tone.Chebyshev(chebyshevSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
const autoWahNode = new Tone.AutoWah(autoWahSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()
const synthNode = new Tone.Synth(synthSettings)
const freeverbNode = new Tone.Freeverb(freeverbSettings)
// const tremoloNode = new Tone.Tremolo(tremoloSettings)

synthNode.chain(
  // chebyshevNode,
  pingPongDelayNode,
  autoWahNode,
  channelNode,
  freeverbNode
  // tremoloNode
)

const instrument = [
  // {
  //   id: generateUniqId(),
  //   name: 'Chebyshev',
  //   type: 'ChebyshevEffect',
  //   node: chebyshevNode,
  //   settings: chebyshevSettings
  // },
  {
    id: generateUniqId(),
    name: 'Ping Pong Delay',
    type: 'PingPongDelayEffect',
    node: pingPongDelayNode,
    settings: pingPongDelaySettings
  },
  {
    id: generateUniqId(),
    name: 'Auto Wah',
    type: 'AutoWahEffect',
    node: autoWahNode,
    settings: autoWahSettings
  },

  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  },
  {
    id: generateUniqId(),
    name: '',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings
  }
  // {
  //   id: generateUniqId(),
  //   name: 'Freeverb',
  //   type: 'Freeverb',
  //   node: freeverbNode,
  //   settings: freeverbSettings
  // }
  // {
  //   id: generateUniqId(),
  //   name: 'Tremolo',
  //   type: 'Tremolo',
  //   node: tremoloNode,
  //   settings: tremoloSettings
  // }
]

const v = 1

const part = new Tone.Part(
  function (time, note) {
    synthNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  },
  [
    {
      time: '0:0:0',
      noteName: 'Ab2',
      duration: '1n',
      velocity: v
    },
    {
      time: '0:1:0',
      noteName: 'F2',
      duration: '1n',
      velocity: v
    },
    {
      time: '0:2:0',
      noteName: 'Bb2',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:0:0',
      noteName: 'Eb3',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:1:0',
      noteName: 'Bb3',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:2:0',
      noteName: 'F2',
      duration: '1n',
      velocity: v
    },
    {
      time: '1:3:0',
      noteName: 'C3',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:0:0',
      noteName: 'F3',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:1:0',
      noteName: 'C3',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:2:0',
      noteName: 'F3',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:3:0',
      noteName: 'C4',
      duration: '1n',
      velocity: v
    },
    {
      time: '2:3:0',
      noteName: 'Db3',
      duration: '1n',
      velocity: v
    }
  ]
)

part.loopEnd = '3m'
part.loop = true

export { instrument, part }
