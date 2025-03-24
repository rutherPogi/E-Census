export const BARANGAYS = [
  { name: "Santa Maria (Marapuy)", coordinates: [20.7735, 121.8489], zoom: 15 },
  { name: "Santa Rosa", coordinates: [20.7955, 121.8394], zoom: 15 },
  { name: "San Rafael (Idiang)", coordinates: [20.7876, 121.8683], zoom: 15 },
  { name: "Santa Lucia (Kaynatuan)", coordinates: [20.7636, 121.8620], zoom: 15 },
  { name: "Santa Luisa", coordinates: [20.7486, 121.8553], zoom: 15 },
  { name: "Santa Theresa", coordinates: [20.7593, 121.8446], zoom: 15 }
];

export const HOUSE_PIN_COLOR = 'red'; // Using red for house pins to distinguish from barangay pins

export const ITBAYAT_CENTER = [20.7752, 121.8543];
export const DEFAULT_ZOOM = 13; 


export const ITBAYAT_BARANGAYS = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Raele",
        "id": "PHL.11.2.1_1",
        "alternative_name": ""
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [121.9344, 20.7119], [121.9327, 20.7092], [121.9346, 20.7009], [121.9383, 20.6961],
              [121.9358, 20.6978], [121.9268, 20.6978], [121.9206, 20.7008], [121.9223, 20.7058],
              [121.9244, 20.7066], [121.9234, 20.7108], [121.9246, 20.7089], [121.9294, 20.7122],
              [121.9324, 20.7122], [121.9331, 20.7145], [121.9347, 20.7136], [121.9344, 20.7119]
            ]
          ],
          [
            [
              [121.8572, 20.735], [121.8536, 20.7228], [121.8461, 20.7133], [121.8392, 20.7081],
              [121.8336, 20.7061], [121.8285, 20.7063], [121.8277, 20.7032], [121.822, 20.6964],
              [121.818, 20.6953], [121.8153, 20.6919], [121.8092, 20.6886], [121.8025, 20.6878],
              [121.799, 20.689], [121.7991, 20.6948], [121.7894, 20.7032], [121.7889, 20.7071],
              [121.7814, 20.7197], [121.7872, 20.7281], [121.7897, 20.7378], [121.8572, 20.735]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "San Rafael",
        "id": "PHL.11.2.2_1",
        "alternative_name": "Idiang"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [121.8181, 20.7368], [121.7897, 20.7378], [121.7928, 20.7422], [121.7936, 20.7467],
              [121.8011, 20.755], [121.8064, 20.7575], [121.8105, 20.7561], [121.8111, 20.7583],
              [121.814, 20.76], [121.8158, 20.7756], [121.8222, 20.785], [121.8278, 20.7901],
              [121.8424, 20.7824], [121.8203, 20.7432], [121.8181, 20.7368]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Santa Lucia",
        "id": "PHL.11.2.3_1",
        "alternative_name": "Kauhauhasan"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [121.8572, 20.7355], [121.8181, 20.7368], [121.8203, 20.7432], [121.8424, 20.7824],
              [121.8726, 20.7738], [121.8742, 20.7714], [121.8736, 20.7692], [121.8768, 20.7667],
              [121.8761, 20.7647], [121.8778, 20.7622], [121.8767, 20.7581], [121.8681, 20.7536],
              [121.8575, 20.7506], [121.8561, 20.7453], [121.8586, 20.74], [121.8558, 20.7386],
              [121.8572, 20.7355]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Santa Maria",
        "id": "PHL.11.2.4_1",
        "alternative_name": "Marapuy"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [121.8726, 20.7738], [121.8424, 20.7824], [121.8473, 20.7911], [121.8497, 20.7912],
              [121.8567, 20.8002], [121.859, 20.8205], [121.8693, 20.8309], [121.8719, 20.8269],
              [121.88, 20.8208], [121.8793, 20.8166], [121.8813, 20.8109], [121.8834, 20.8096],
              [121.8839, 20.8037], [121.881, 20.7937], [121.8778, 20.7928], [121.8764, 20.7942],
              [121.8728, 20.7919], [121.873, 20.7878], [121.8683, 20.7825], [121.8739, 20.7764],
              [121.8726, 20.7738]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Santa Rosa",
        "id": "PHL.11.2.5_1",
        "alternative_name": "Kaynatuan"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [121.8278, 20.7901], [121.8339, 20.805], [121.8342, 20.8214], [121.8358, 20.8244],
              [121.845, 20.8289], [121.8506, 20.8344], [121.8538, 20.8341], [121.8598, 20.8364],
              [121.8637, 20.8341], [121.8658, 20.8351], [121.8661, 20.8328], [121.8693, 20.8309],
              [121.859, 20.8205], [121.8567, 20.8002], [121.8497, 20.7912], [121.8473, 20.7911],
              [121.8424, 20.7824], [121.8278, 20.7901]
            ]
          ],
          [
            [
              [121.9044, 20.9078], [121.9086, 20.9042], [121.9061, 20.8994], [121.901, 20.8979],
              [121.8975, 20.9056], [121.9017, 20.91], [121.9044, 20.9078]
            ]
          ],
          [
            [
              [121.9081, 20.9206], [121.9067, 20.9253], [121.9089, 20.9278], [121.91, 20.925],
              [121.908, 20.9235], [121.9094, 20.9206], [121.9081, 20.9206]
            ]
          ],
          [
            [
              [121.9208, 20.936], [121.9233, 20.9306], [121.9269, 20.9266], [121.9296, 20.9264],
              [121.9331, 20.9211], [121.93, 20.9214], [121.9278, 20.925], [121.9197, 20.9283],
              [121.9161, 20.928], [121.9133, 20.9303], [121.9131, 20.9328], [121.915, 20.9344],
              [121.9208, 20.936]
            ]
          ],
          [
            [
              [121.9354, 21.0699], [121.9357, 21.0615], [121.9321, 21.0607], [121.9279, 21.0621],
              [121.9265, 21.064], [121.9274, 21.0663], [121.9285, 21.0651], [121.931, 21.0688],
              [121.9354, 21.0699]
            ]
          ]
        ]
      }
    }
  ]
};

export const HAZARD_TYPES = [
  { id: 'landslide', label: 'Landslide Prone', color: '#e74c3c' },
  { id: 'flood', label: 'Flood Prone', color: '#3498db' },
  { id: 'earthquake', label: 'Earthquake Damage', color: '#f39c12' },
  { id: 'tsunami', label: 'Tsunami Risk', color: '#9b59b6' },
  { id: 'storm', label: 'Storm Surge', color: '#2ecc71' }
];