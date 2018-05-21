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
    kalei: kaleidoPass,
    badTv: badTVPass,
    rgbShift: rgbShiftPass,
    hueSaturation: hueSaturationPass,
    brightnessContrast: brightnessContrastPass
  };

  return shaderPasses;
};

export default getShaderPasses;
