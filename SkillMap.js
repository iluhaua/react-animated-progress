/* jshint esversion: 6 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SkillMap extends Component {
  static defaultProps = {
    stages: {
      2: 1692,
      3: 1523,
      4: 1294,
      5: 986,
      6: 708,
      7: 550,
      8: 0
    },
    currentStage: 1,
    progress: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentOffset: 1906,
      baseLineOffset: 1906,
      targetOffset: 1906,
    };
    console.log(`=== targetoffset: ${this.state.targetOffset} ===`);
    this.getColorByProgress = this.getColorByProgress.bind(this);
    this.getColorByStage = this.getColorByStage.bind(this);
    this.getOffsetByProgress = this.getOffsetByProgress.bind(this);
    this.getLabelsOffsetByProgress = this.getLabelsOffsetByProgress.bind(this);
    this.getDashOffsetByProgress = this.getDashOffsetByProgress.bind(this);
    this.getDashOffsetByStage = this.getDashOffsetByStage.bind(this);
    this.getDashOffsetByProp = this.getDashOffsetByProp.bind(this);
    this.updatePath = this.updatePath.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.setState((prevState, props) => {
      return { baseLineOffset: 0 };
    });
    this.updatePath();
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.updatePath();
  }

  updatePath() {
    this.setState((prevState, props) => {
      return { currentOffset: this.getDashOffsetByProp() };
    });
  }

  getColorByProgress() {
    console.log(`Current progress: ${this.props.progress}`);
    if (this.props.progress < 7) {
      return '#34f3d1';
    } else if (this.props.progress >= 7 && this.props.progress < 27) {
      return '#d70000';
    } else if (this.props.progress >= 27 && this.props.progress < 43) {
      return '#03d8ff';
    } else if (this.props.progress >= 43 && this.props.progress < 58) {
      return '#ff9d33';
    } else if (this.props.progress >= 58 && this.props.progress < 84) {
      return '#ecf334';
    } else if (this.props.progress >= 84) {
      return '#ecf334';
    }
  }

  getColorByStage() {
    if (this.props.currentStage < 2) {
      return '#34f3d1';
    } else if (this.props.currentStage >= 2 && this.props.currentStage < 4) {
      return '#d70000';
    } else if (this.props.currentStage >= 4 && this.props.currentStage < 5) {
      return '#03d8ff';
    } else if (this.props.currentStage >= 5 && this.props.currentStage < 6) {
      return '#ff9d33';
    } else if (this.props.currentStage >= 6 && this.props.currentStage < 7) {
      return '#ecf334';
    } else if (this.props.currentStage >= 7) {
      return '#ecf334';
    }
  }

  getOffsetByProgress() {
    if (this.props.currentStage > 1) {
      if (this.props.currentStage <= 5) {
        return 275;
      }
      return -350;
    }

    if (this.props.progress <= 43) {
      return 275;
    }
    return -350;
  }

  getLabelsOffsetByProgress() {
    if (this.props.currentStage > 1) {
      if (this.props.currentStage <= 5) {
        return 0;
      }
      return -1180;
    }
    if (this.props.progress <= 43) {
      return 0;
    }
    return -1180;
  }

  getDashOffsetByProgress() {
    let offsetByProgress = 1906 * (1 - (this.props.progress / 100)) - 100;
    return offsetByProgress;
  }

  getDashOffsetByStage() {
    return this.props.stages[this.props.currentStage];
  }

  getDashOffsetByProp() {
    let dashOffset = this.state.targetOffset;
    if (this.props.currentStage > 1) {
      dashOffset = this.getDashOffsetByStage();
    } else {
      dashOffset = this.getDashOffsetByProgress();
    }
    console.log(`Dash offset: ${dashOffset}`);
    return dashOffset;
  }

  getColorByProp() {
    let color = '#34f3d1';
    if (this.props.currentStage > 1) {
      color = this.getColorByStage();
    } else {
      color = this.getColorByProgress();
    }
    console.log(`Dash color: ${color}`);
    return color;
  }

  render() {
    const d = 'M0 10L 214 10 214 30 333 30 333 60 527 60 527 25 623 25 623 0 752 0 752 58 844 58 844 8 980 8 980 37 1070 37 1070 68 1269 68 1269 56 1389 56 1389 43 1600 43';

    const offset = this.getOffsetByProgress();
    const color = this.getColorByProp();
    const labelsOffset = this.getLabelsOffsetByProgress();

    const css = `
      @import url('https://fonts.googleapis.com/css?family=Changa:300');
      
      .skill-map {
        background-color: #000000;
        color: #ffffff;
        font-family: 'Changa', sans-serif;
        height: 700px;
        position: relative;
      }
      #map-path {
        position: absolute;
        top: 0;
        transform: rotate3d(1,0,0,40deg) scale(1.8)
      }
      #map-labels {
        position: absolute;
        top:0;
      }
      .text-label {
        font-size: 14px;
        font-family: Changa;
        font-weight: 600;
        text-transform: uppercase;
        transform: translateX(${labelsOffset}px);
      }
      .path-plane {
        perspective: 600px;
        position: relative;
      }
      .header {
        padding-left: 108px;
        padding-right: 98px;
      }
      .header-content {
        width: 100%;
      }
      .header-content .left-part {
        top: 50px;
        position: relative;
        width: 50%;
        font-size: 13px;
        font-weight: 400;
        color: #808082;
        text-align: left;
        display: inline-block;
      }
      .header-content .right-part {
        top: 50px;
        position: relative;
        width: 50%;
        font-size: 13px;
        font-weight: 400;
        color: #808082;
        text-align: right;
        display: inline-block;
      }
      .name {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin-left: 8px;
      }
      .path-container {
        overflow: hidden;
        position: absolute;
        display: block;
        box-sizing: border-box;
        top: 50%;
        height: 300px;
        width: 100%;
        transform: translateY(-30%);
      }
      .progress-bar-container {
        width: 100%;
        border: 1px solid #666f7d;
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
      }
      .progress-bar {
        height: 60px;
        width: ${this.props.progress}%;
        font-size: 13px;
        position: relative;
        background: -webkit-linear-gradient(5deg, ${color} 26%, rgba(106, 52, 243, 0) 74%);
        background: -moz-linear-gradient(5deg, ${color} 26%, rgba(106, 52, 243, 0) 74%);
        background: -o-linear-gradient(5deg, ${color} 26%, rgba(106, 52, 243, 0) 74%);
        background: -ms-linear-gradient(5deg, ${color} 26%, rgba(106, 52, 243, 0) 74%);
        background: linear-gradient(85deg, ${color} 26%, rgba(106, 52, 243, 0) 74%);
        transition: width 4s ease-out;
      }
      .progress-bar .percentage {
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        width: 170px;
        text-align: center;
        right: 0;
      }
    `;

    return (
      <div className="skill-map">
        <style>{css}</style>
        <div className="header" style={{ height: '70px' }}>
          <div className="header-content">
            <div className="left-part">
              <img src={require('./mic.svg')} alt="microphone" style={{width: '16px'}}/>
              <span className="name">{this.props.whoseTurn},</span>
              <span> it's your turn to speak</span>
            </div>
            <div className="right-part">
              <span>Speaker :</span><span className="name">{this.props.speaker}</span>
              <span style={{ marginLeft: '22px' }}>Up Next :</span><span className="name">{this.props.upnext}</span></div>
          </div>
        </div>
        <h1 style={{fontSize: '65px', fontWeight: '300', marginLeft: '108px'}}>Skill map</h1>
        <div className="path-container">
          <div className="path-plane">
            <svg id="map-path" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -96 1650 300">
              <defs>
                <filter id="sofGlow2" height="300%" width="300%" x="-75%" y="-75%">
                  <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken">
                    {/* <animate attributeType="XML" attributeName="radius" 
                    from="2" to="4" dur="1s" 
                    values="2 ; 4 ; 2"
                    keyTimes="0 ; 0.5 ; 1" repeatCount="indefinite"/> */}
                  </feMorphology>
                  <feGaussianBlur in="thicken" stdDeviation="4" result="blurred" />
                  <feFlood floodColor={color} result="glowColor" />
                  <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />
                  <feMerge>
                    <feMergeNode in="softGlow_colored"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g style={{ transform: `translateX(${offset}px)` }}>
                <path id="skillMapBase" style={{
                  strokeDashoffset: `${this.state.baseLineOffset}px`,
                  strokeDasharray: '1906 1906',
                  transition: `stroke-dashoffset 4s linear 0s`}} 
                  d={d} fill="none" stroke="#61FBFC" strokeWidth="2"/>
                <path id="skillMap" style={{
                  strokeDashoffset: `${this.state.currentOffset}px`,
                  strokeDasharray: '1906 1906',
                  transition: `stroke-dashoffset 5s ease-out 0.5s`}} 
                  d={d} fill='none' stroke={color} strokeWidth='2' filter='url(#sofGlow2)'/>
                <circle cx="214" cy="10" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
                <circle cx="333" cy="60" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
                <circle cx="527" cy="25" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
                <circle cx="752" cy="58" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
                <circle cx="980" cy="8" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
                <circle cx="1070" cy="68" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
                <circle cx="1389" cy="43" r="3"
                  style={{ stroke: '#ffffff', strokeWidth: 13, fill: '#ffffff', fillOpacity: 1, strokeOpacity: 0.2}}/>
              </g>
            </svg>
            <svg id="map-labels" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -60 1650 300">
              <g className="text-label">
                <text x="100" y="50" stroke="none" fill="#ffffff">
                  <tspan dy="0">01</tspan>
                  <tspan dy="22" dx="-20">Intro</tspan>
                </text>
                <text x="300" y="0" stroke="none" fill="#ffffff">
                  <tspan dy="-22">02</tspan>
                  <tspan dy="22" dx="-20">Impact of a breach</tspan>
                </text>
                <text x="455" y="130" stroke="none" fill="#ffffff">
                  <tspan dy="0">03</tspan>
                  <tspan dy="22" dx="-20">Bugs in human hardware</tspan>
                </text>
                <text x="820" y="-10" stroke="none" fill="#ffffff">
                  <tspan dy="0">04</tspan>
                  <tspan dy="22" dx="-20">Atack vectors</tspan>
                </text>
                <text x="1230" y="130" stroke="none" fill="#ffffff">
                  <tspan dy="0">05</tspan>
                  <tspan dy="22" dx="-20">Type of hackers</tspan>
                </text>
                <text x="1710" y="-28" stroke="none" fill="#ffffff">
                  <tspan dy="0">06</tspan>
                  <tspan dy="22" dx="-20">Hackers tales</tspan>
                </text>
                <text x="1840" y="140" stroke="none" fill="#ffffff">
                  <tspan dy="0">07</tspan>
                  <tspan dy="22" dx="-20">Key assets</tspan>
                </text>
                <text x="2410" y="16" stroke="none" fill="#ffffff">
                  <tspan dy="0">08</tspan>
                  <tspan dy="22" dx="-20">Congurulations!</tspan>
                </text>
              </g>
            </svg>
          </div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="percentage">{this.props.progress} %</div>
          </div>
        </div>
      </div>
    );
  }
}