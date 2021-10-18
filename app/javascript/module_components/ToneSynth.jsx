import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Slider from '../control_components/Slider'
import Knob from '../control_components/Knob'
import ButtonSet from '../control_components/ButtonSet'

export default class ToneSynth extends Component {
  constructor(props) {
    super(props)
  }

  updateNodeParams = () => {
    const { node, settings } = this.props
    const { oscillator } = settings
    const { type } = oscillator

    // node.volume.value = volume
    node.oscillator.type = type
  }

  handlePropertyValueChange = (property, value) => {
    const { id, handlePropertyValueChange } = this.props
    handlePropertyValueChange(id, property, value)
  }

  render() {
    const { name, settings } = this.props
    const { oscillator } = settings

    const { type } = oscillator

    const oscillatorTypes = [
      'fatsine',
      'fatsquare',
      'fatsawtooth',
      'fattriangle',
      'fmsine',
      'fmsquare',
      'fmsawtooth',
      'fmtriangle',
      'amsine',
      'amsquare',
      'amsawtooth',
      'amtriangle',
      'pulse',
      'pwm'
    ]

    this.updateNodeParams()

    return (
      <div className="ToneSynth">
        <ButtonSet
          name=""
          property={['oscillator', 'type']}
          value={type}
          options={oscillatorTypes}
          handleChange={this.handlePropertyValueChange}
        />
      </div>
    )
  }
}

ToneSynth.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  node: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  handlePropertyValueChange: PropTypes.func.isRequired
}
