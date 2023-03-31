import React, { useEffect, useRef } from 'react';

const { BMapGL, BMapLib, BMap } = window as any;
const Map = () => {
  const ref = useRef({
    map: null as any,
  });

  const initMap = () => {
    const map = new BMap.Map('base-container'); // 创建地图实例
    console.log('👴2023-03-28 18:39:45 index.tsx line:10', map);
    const point = new BMap.Point(116.418261, 39.921984);
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(); // 允许滚轮缩放

    ref.current.map = map;
  };
  const initHot = () => {
    const { map } = ref.current;

    const points = [
      { lng: 116.417129, lat: 39.928227, count: 21 },
      { lng: 116.426426, lat: 39.922286, count: 80 },
      { lng: 116.421597, lat: 39.91948, count: 32 },
      { lng: 116.423895, lat: 39.920787, count: 26 },
      { lng: 116.423563, lat: 39.921197, count: 17 },
      { lng: 116.417982, lat: 39.922547, count: 17 },
      { lng: 116.426126, lat: 39.921938, count: 25 },
      { lng: 116.42326, lat: 39.915782, count: 100 },
      { lng: 116.419239, lat: 39.916759, count: 39 },
      { lng: 116.417185, lat: 39.929123, count: 11 },
      { lng: 116.417237, lat: 39.927518, count: 9 },
      { lng: 116.417784, lat: 39.915754, count: 47 },
      { lng: 116.420193, lat: 39.917061, count: 52 },
      { lng: 116.422735, lat: 39.915619, count: 100 },
      { lng: 116.418495, lat: 39.915958, count: 46 },
      { lng: 116.416292, lat: 39.931166, count: 9 },
      { lng: 116.419916, lat: 39.924055, count: 8 },
      { lng: 116.42189, lat: 39.921308, count: 11 },
      { lng: 116.413765, lat: 39.929376, count: 3 },
      { lng: 116.418232, lat: 39.920348, count: 50 },
      { lng: 116.417554, lat: 39.930511, count: 15 },
      { lng: 116.418568, lat: 39.918161, count: 23 },
      { lng: 116.413461, lat: 39.926306, count: 3 },
      { lng: 116.42232, lat: 39.92161, count: 13 },
      { lng: 116.4174, lat: 39.928616, count: 6 },
      { lng: 116.424679, lat: 39.915499, count: 21 },
      { lng: 116.42171, lat: 39.915738, count: 29 },
      { lng: 116.417836, lat: 39.916998, count: 99 },
      { lng: 116.420755, lat: 39.928001, count: 10 },
      { lng: 116.414077, lat: 39.930655, count: 14 },
      { lng: 116.426092, lat: 39.922995, count: 16 },
      { lng: 116.41535, lat: 39.931054, count: 15 },
      { lng: 116.413022, lat: 39.921895, count: 13 },
      { lng: 116.415551, lat: 39.913373, count: 17 },
      { lng: 116.421191, lat: 39.926572, count: 1 },
      { lng: 116.419612, lat: 39.917119, count: 9 },
      { lng: 116.418237, lat: 39.921337, count: 54 },
      { lng: 116.423776, lat: 39.921919, count: 26 },
      { lng: 116.417694, lat: 39.92536, count: 17 },
      { lng: 116.415377, lat: 39.914137, count: 19 },
      { lng: 116.417434, lat: 39.914394, count: 43 },
      { lng: 116.42588, lat: 39.922622, count: 27 },
      { lng: 116.418345, lat: 39.919467, count: 8 },
      { lng: 116.426883, lat: 39.917171, count: 3 },
      { lng: 116.423877, lat: 39.916659, count: 34 },
      { lng: 116.415712, lat: 39.915613, count: 14 },
      { lng: 116.419869, lat: 39.931416, count: 12 },
      { lng: 116.416956, lat: 39.925377, count: 11 },
      { lng: 116.42066, lat: 39.925017, count: 38 },
      { lng: 116.416244, lat: 39.920215, count: 91 },
      { lng: 116.41929, lat: 39.915908, count: 54 },
      { lng: 116.422116, lat: 39.919658, count: 21 },
      { lng: 116.4183, lat: 39.925015, count: 15 },
      { lng: 116.421969, lat: 39.913527, count: 3 },
      { lng: 116.422936, lat: 39.921854, count: 24 },
      { lng: 116.41905, lat: 39.929217, count: 12 },
      { lng: 116.424579, lat: 39.914987, count: 57 },
      { lng: 116.42076, lat: 39.915251, count: 70 },
      { lng: 116.425867, lat: 39.918989, count: 8 },
    ];

    const heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 20 });
    map.addOverlay(heatmapOverlay);

    console.log('👴2023-03-28 18:55:18 map.tsx line:86', heatmapOverlay);

    heatmapOverlay.setDataSet({ data: points, max: 100 });
  };

  const initIcon = () => {
    const { map } = ref.current;

    const marker1 = new BMap.Marker(new BMap.Point(116.404, 39.925));
    const marker2 = new BMap.Marker(new BMap.Point(116.404, 39.915));
    const marker3 = new BMap.Marker(new BMap.Point(116.395, 39.935));
    const marker4 = new BMap.Marker(new BMap.Point(116.415, 39.931));
    // 在地图上添加点标记
    map.addOverlay(marker1);
    map.addOverlay(marker2);
    map.addOverlay(marker3);
    map.addOverlay(marker4);

    // new BMapLib.MarkerClusterer(map, {
    //   markers: markerStationList,
    //   styles: [{ url: mapStBg, size: new BMapGL.Size(48, 48), textColor: '#FFF', textSize: 12 }],
    //   minClusterSize: 5,
    // });
  };

  useEffect(() => {
    initMap();
    initHot();
    initIcon();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f00',
      }}
      id="base-container"
    />
  );
};

export default Map;
