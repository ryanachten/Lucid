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
  textureSettings: {
    tileCount: 4
  }

}

export default (state = settingsReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_ZOOM_OUT':
      return {
        ...state,
        zoomOut: action.zoomOut
      }
      break;

    case 'SET_TILE_COUNT':
      const textureSettings = state.textureSettings;
      return {
        ...state,
        textureSettings: {
          ...textureSettings,
          tileCount: action.tileCount
        }
      }
      break;

    default:
      return state;
  }
};
