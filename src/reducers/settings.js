/*
shuffleMode: boolean,
zoomOut: boolean,
shapeSettings: {
	activeShape: string,
	rotate3D: boolean,
	x-rotate: float,
	y-rotate: float,
	z-rotate?: float
},
textureSettings: {
	tileCount: int,
	rotate2D: boolean,
	x-rotate: float,
	y-rotate: float
},
activeShaders: [
	shaderName: {
		uniforms: [
			uniformName: int
		]
	}
],
defaultShaderSettings:{
	shaderName: {
		uniforms: [
			uniformName: {
				min: int,
				max: int,
				default: int
			}
		]
	}
}
*/

const settingsReducerDefaultState = {
  zoomOut: false,


}

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_ZOOM_OUT':
      return {
        ...state,
        zoomOut: action.zoomOut
      }
      break;

    default:
      return state;
  }
};
