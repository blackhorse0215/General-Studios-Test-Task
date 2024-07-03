module.exports = {
  content: [
    './layout/**/*.liquid',
    './templates/**/*.liquid',
    './sections/**/*.liquid',
    './snippets/**/*.liquid',
    './assets/**/*.liquid',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      width:{
        '70px':'70px',
        '80px':'80px',
        '120px':'120px',
        '200px':'200px',
        '[45vw-35]': 'calc(45vw - 35px)',
        '50vw':'50vw',
        '52px':'52px',
        '25px':'25px',
        '20px':'20px',
        '100px':'100px',
        '10%':'10%',
        '90%':'90%'
      },
      height:{
        '18px':'18px',
        '20px':'20px',
        '70px':'70px',
        '25px':'25px',
        '80px':'80px',
        '20px':'20px',
        '50px':'50px',
        '45px':'45px',
        '40px':'40px',
        '60px':'60px',
        '100px':'100px',
        '360px':'360px',
      },
      minWidth:{
        '115px':'115px',
        '10%':'10%',
        '50%':'50%',
        '[45vw-35]': 'calc(45vw - 35px)',
      },
      minHeight:{
        '50px':'50px',
        '500px':'500px'
      },
      writingMode: {
        'vertical-rl': 'vertical-rl',
      },
      padding:{
        '170px':'170px',
        '120px':'120px',
        '50px':'50px',
        '70px':'70px',
        '90px':'90px',
        '110px':'110px',
        '100px':'100px',
        '60px':'60px',
        '30px':'30px',
        '40px':'40px',
        '20px':'20px',
        '15px':'15px',
        '13px':'13px',
        '10px':'10px',
        '5px':'5px'
      },
      margin:{
        '30px':'30px',
        '20px':'20px',
        '6px':'6px',
        '2px':'2px',
        'm10px':'-10px'
      },
      gap:{
        '10px':'10px',
        '20px':'20px',
        '30px':'30px',
        '50px':'50px',
        '40px':'40px'
      },
      inset:{
        '20px':'20px',
        '50%':'50%',
        'm-27px':'-27px',
        'm400px':'-400px',
        '70px':'70px',
        '0px':'0px',
        'm400px':'-400px'
      },
      translate: {
        'b20px':'-20px',
        'k50%' : 'calc(50% - 35px)',
        '70px':'70px',
        '[50vw]':'calc(-50vw)',
        '100vw':'100vw'
      },
      colors: {
        'customGray': 'rgb(142, 142, 142)',
        'Gray':'gray-500',
        "Black":'gray-500',
        "Broze":"yellow-800",
        "Yellow":"yellow-400"
      },
      fontSize:{
        '28px':'28px',
        '21px':'21px',
        '19px':'19px',
        '15px':'15px',
        '14px':'14px',
        '16px':'16px'
      },
      gridTemplateColumns:{
        'custom': '300px 1fr',
      },
      borderRadius:{
        '50%':'50%'
      }
    },
  },
  plugins: [],
}
