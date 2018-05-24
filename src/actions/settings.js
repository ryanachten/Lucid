export const setFullScreenMode = (fullscreenMode) => {
  return{
    type: 'SET_FULLSCREEN_MODE',
    fullscreenMode
  }
};


export const setZoomOut = (zoomOut) => {
  return{
    type: 'SET_ZOOM_OUT',
    zoomOut
  }
};

export const setTileCount = (tileCount) => {
  return{
    type: 'SET_TILE_COUNT',
    tileCount
  }
};

export const toggleTextureRotation = (rotate) => {
  return{
    type: 'TOGGLE_TEXTURE_ROTATION',
    rotate
  }
};

export const setTextureRotation = ({axis, speed}) => {
  return{
    type: 'SET_TEXTURE_ROTATION',
    axis,
    speed
  }
};

export const setGeometryShape = (geometryShape) => {
  return{
    type: 'SET_GEOMETRY_SHAPE',
    geometryShape
  }
}

export const addActiveShader = ({name, uniformDefaults}) => {
  return{
    type: 'ADD_ACTIVE_SHADER',
    name, uniformDefaults
  }
}

export const removeActiveShader = (shader) => {
  return{
    type: 'REMOVE_ACTIVE_SHADER',
    shader
  }
}

export const updateAllShaderOrder = (shaders) => {
  return{
    type: 'UPDATE_ALL_SHADER_ORDER',
    shaders
  }
}

export const updateActiveShaderOrder = (shaders) => {
  return{
    type: 'UPDATE_ACTIVE_SHADER_ORDER',
    shaders
  }
}

export const updateShaderUniform = ({shader, uniform, newValue}) => {
  return{
    type: 'UPDATE_SHADER_UNIFORM',
    shader,
    uniform,
    newValue
  }
}
