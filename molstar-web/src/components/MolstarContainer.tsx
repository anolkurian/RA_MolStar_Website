import React, { useEffect } from 'react';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui/index';
import { PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { DefaultPluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import 'molstar/lib/mol-plugin-ui/skin/light.scss';

interface MolstarContainerProps {
  url: string; // URL from where you want to download the data
}

const MolstarContainer: React.FC<MolstarContainerProps> = ({ url }) => {
  useEffect(() => {
    createPlugin();
  }, []);

  const createPlugin = async () => {
    const parent = document.getElementById('molstar-container') as HTMLElement;
    const MySpec: PluginUISpec = {
      ...DefaultPluginUISpec(),
      config: [[PluginConfig.VolumeStreaming.Enabled, false]],
    };
    console.log(MySpec);
    const plugin = await createPluginUI(parent, MySpec);

    const data = await plugin.builders.data.download({ url }, { state: { isGhost: true } });
    const trajectory = await plugin.builders.structure.parseTrajectory(data, 'mmcif');
    await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
  };

  return <div id="molstar-container" style={{ width: '80%', height: '80vh' }}></div>;
};

export default MolstarContainer;
