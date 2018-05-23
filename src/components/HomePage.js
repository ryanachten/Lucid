import React from 'react';
import { connect } from 'react-redux';
import { IconToggle } from 'rmwc/IconToggle';
import '@material/icon-toggle/dist/mdc.icon-toggle.min.css';
import { Toolbar, ToolbarRow,ToolbarSection,
  ToolbarTitle, ToolbarIcon } from 'rmwc/Toolbar';
import '@material/toolbar/dist/mdc.toolbar.min.css';
import { TabBar, Tab, TabIcon,
  TabIconText, TabBarScroller } from 'rmwc/Tabs';
import '@material/tabs/dist/mdc.tabs.min.css';

import ThreeProject from './ThreeProject';
import LoadingScreen from './LoadingScreen';

import FullScreenButton from './FullScreenButton';
import SortableShaderList from './SortableShaderList';
import ShapeSettings from './ShapeSettings';
import TextureSettings from './TextureSettings';


class HomePage extends React.Component{
  constructor(props){
    super(props);

    this.onOpenMenu = this.onOpenMenu.bind(this);
    this.onCloseMenu = this.onCloseMenu.bind(this);

    this.state = {
      menuOpen: false,
      activeTabIndex: 0
    }
  }

  onOpenMenu(){
    this.setState( () => ({
      menuOpen: true
    }));
  }

  onCloseMenu(){
    this.setState( () => ({
      menuOpen: false
    }));
  }

  render = () => {

    return(
      <div>
        <FullScreenButton />

        {!this.state.menuOpen && (
          <IconToggle
            className="ui__openMenuButton"
            on={{label: 'Exit menu', content: 'menu'}}
            off={{label: 'Enter menu', content: 'menu'}}
            onClick={this.onOpenMenu}
          />
        )}

        {this.state.menuOpen && (
          <div className="ui__container">

            <Toolbar>
              <ToolbarRow>
                <ToolbarSection alignStart>
                  <ToolbarTitle>Settings</ToolbarTitle>
                </ToolbarSection>
                <ToolbarSection alignEnd>
                  <ToolbarIcon use="close" onClick={this.onCloseMenu}/>
                </ToolbarSection>
              </ToolbarRow>
            </Toolbar>

            <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({'activeTabIndex': evt.target.value})}>
              <Tab>
                <TabIcon>grain</TabIcon><TabIconText>Shape</TabIconText>
              </Tab>
              <Tab>
                <TabIcon>texture</TabIcon><TabIconText>Texture</TabIconText>
              </Tab>
              <Tab>
                <TabIcon>blur_on</TabIcon><TabIconText>Shaders</TabIconText>
              </Tab>
            </TabBar>

            { this.state.activeTabIndex === 0 && (
              <ShapeSettings
                zoomOut={this.props.zoomOut}
                geometryShape={this.props.geometryShape}
              />
            )}

            { this.state.activeTabIndex === 1 && (
              <TextureSettings
                tileCount={this.props.tileCount}
                rotateTexture={this.props.rotateTexture}
                rotateTextureX={this.props.rotateTextureX}
                rotateTextureY={this.props.rotateTextureY}
              />
            )}

            { this.state.activeTabIndex === 2 && (
              <SortableShaderList shaders={this.props.allShaders}/>
            )}
          </div>
        )}

        <ThreeProject
          zoomOut={this.props.zoomOut}
          tileCount={this.props.tileCount}
          rotateTexture={this.props.rotateTexture}
          rotateTextureSpeed={{
            x: this.props.rotateTextureX,
            y: this.props.rotateTextureY
          }}
          selectedObject={this.props.geometryShape}
          activeShaders={this.props.activeShaders}
        />
      </div>
    );
  };
}

const mapStateToProps = (settings) => {
  return {
    zoomOut: settings.zoomOut,
    tileCount: settings.textureSettings.tileCount,
    rotateTexture: settings.textureSettings.rotateTexture,
    rotateTextureX: settings.textureSettings.rotateX,
    rotateTextureY: settings.textureSettings.rotateY,
    geometryShape: settings.shapeSettings.geometryShape,
    allShaders: settings.shaderSettings.defaultShaderUniforms,
    activeShaders: settings.shaderSettings.activeShaders
  }
};

export default connect(mapStateToProps)(HomePage);
