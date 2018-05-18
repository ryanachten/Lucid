import * as THREE from 'three';
import {ShaderPass} from 'three-effectcomposer-es6';
import KaleidoShader from '../shaders/KaleidoShader';
import BadTVShader from '../shaders/BadTVShader';
import RGBShiftShader from '../shaders/RGBShiftShader';
import HueSaturationShader from '../shaders/HueSaturationShader';
import BrightnessContrastShader from '../shaders/BrightnessContrastShader';

const getShaderPasses = () => {
  THREE.BadTVShader = BadTVShader;
  THREE.KaleidoShader = KaleidoShader;
  THREE.RGBShiftShader = RGBShiftShader;
  THREE.HueSaturationShader = HueSaturationShader;
  THREE.BrightnessContrastShader = BrightnessContrastShader;
  const badTVPass = new ShaderPass( THREE.BadTVShader );
  const kaleidoPass = new ShaderPass( THREE.KaleidoShader );
  const rgbShiftPass = new ShaderPass( THREE.RGBShiftShader );
  const hueSaturationPass = new ShaderPass( THREE.HueSaturationShader );
  const brightnessContrastPass = new ShaderPass( THREE.BrightnessContrastShader );

  const shaderPasses = {
    none: { shader: undefined },
    kalei: {
      shader: kaleidoPass,
      uniforms: {
        sides: { min: 2, max: 20, default: 6 }
      }
    },
    badTv: {
      shader: badTVPass,
      uniforms: {
        time: { min: 0.0, max: 10.0, default: 0.0 },
        distortion: { min: 0.0, max: 10.0, default: 3.0 },
        distortion2: { min: 0.0, max: 10.0, default: 5.0 },
        speed: { min: 0.0, max: 1.0, default: 0.2 },
        rollSpeed: { min: 0.0, max: 1.0, default: 0.2 },
      }
    },
    rgbShift: {
      shader: rgbShiftPass,
      uniforms: {
        amount: { min: 0, max: 1, default: 0.05 },
        angle: { min: 0, max: (Math.PI*2), default: 0.0 }
      }
    },
    hueSaturation: {
      shader: hueSaturationPass,
      uniforms: {
        hue: { min: -1, max: 1, default: 0.5 },
        saturation: { min: -1, max: 1, default: 0.5 }
      }
    },
    brightnessContrast: {
      shader: brightnessContrastPass,
      uniforms: {
        brightness: { min: -1, max: 1, default: 0 },
        contrast: { min: -1, max: 1, default: 0.5 }
      }
    }
  };

  return shaderPasses;
};

export default getShaderPasses;
