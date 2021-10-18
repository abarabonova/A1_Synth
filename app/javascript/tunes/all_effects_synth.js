import * as Tone from 'tone'
import { generateUniqId } from '../utilities'

const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.05,
  envelope: {
    attack: 0,
    attackCurve: 'exponential',
    decay: 0,
    decayCurve: 'exponential',
    sustain: 1,
    release: 0,
    releaseCurve: 'exponential'
  },
  oscillator: {
    type: 'fatsawtooth',
    modulationType: 'sine',
    phase: 0,
    harmonicity: 0.5
  }
}

const autoFilterSettings = {
  wet: 0,
  type: 'sine',
  frequency: 1,
  depth: 1,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: 'lowpass',
    frequency: 100,
    rolloff: -12,
    Q: 1
  }
}

const autoPannerSettings = {
  wet: 0,
  type: 'sine',
  frequency: 1,
  depth: 1
}

const autoWahSettings = {
  wet: 0,
  baseFrequency: 100,
  octaves: 6,
  sensitivity: 0,
  Q: 2,
  gain: 2,
  follower: 0.1
}

const chebyshevSettings = {
  wet: 0,
  order: 50,
  oversample: 'none'
}

const chorusSettings = {
  wet: 0,
  type: 'sine',
  frequency: 1.5,
  delayTime: 3.5,
  depth: 0.7,
  spread: 180
}

const distortionSettings = {
  wet: 0,
  distortion: 0,
  oversample: '4x'
}

const feedbackDelaySettings = {
  wet: 0,
  delayTime: 0.8,
  maxDelay: 0.8
}

const freeverbSettings = {
  wet: 0.9,
  roomSize: 0.08,
  dampening: 40
}

const frequencyShifterSettings = {
  wet: 0,
  frequency: 42
}

const jcReverbSettings = {
  wet: 0,
  roomSize: 0.5
}

const phaserSettings = {
  wet: 0,
  frequency: 0.5,
  octaves: 3,
  stages: 10,
  Q: 10,
  baseFrequency: 350
}

const pingPongDelaySettings = {
  wet: 0,
  delayTime: 0.25,
  maxDelayTime: 1
}

const pitchShiftSettings = {
  wet: 0,
  pitch: 0,
  windowSize: 0.1,
  delayTime: 0,
  feedback: 0
}

const channelSettings = {
  volume: -14,
  pan: 0
}

const synthNode = new Tone.Synth(synthSettings)
const feedbackDelayNode = new Tone.FeedbackDelay(feedbackDelaySettings)
const phaserNode = new Tone.Phaser(phaserSettings)
const pitchShiftNode = new Tone.PitchShift(pitchShiftSettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(feedbackDelayNode, phaserNode, pitchShiftNode, channelNode)

const instrument = [
  {
    id: generateUniqId(),
    name: 'Feedback Delay',
    type: 'FeedbackDelayEffect',
    node: feedbackDelayNode,
    settings: feedbackDelaySettings
  },

  {
    id: generateUniqId(),
    name: 'Phaser',
    type: 'PhaserEffect',
    node: phaserNode,
    settings: phaserSettings
  },

  {
    id: generateUniqId(),
    name: 'Pitch Shift',
    type: 'PitchShiftEffect',
    node: pitchShiftNode,
    settings: pitchShiftSettings
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
    name: 'Space Synth',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings
  }
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
