const pptxgen = require('pptxgenjs');

const ppt = new pptxgen();

const slide  = ppt.addSlide();

slide.addText('北京大学', { x: '10%', y: '10%', color: '#ff0000', fontSize: 30,  align: ppt.AlignH.center,});

slide.addImage({ 
    path: "https://nos.netease.com/edu-image/F78C41FA9703708FB193137A688F7195.png?imageView&thumbnail=150y150&quality=100", 
    x: '42%',
    y: '25%',
});

slide.addText(`北京大学创办于1898年，初名京师大学堂，是中国第一所国立综合性大学，也是当时中国最高教育行政机关。辛亥革命后，于1912年改为现名。 学校为教育部直属全国重点大学，国家“211工程”、“985工程”建设大学、C9联盟，以及东亚研究型大学协会、国际研究型大学联盟、环太平洋大学联盟、东亚四大学论坛的重要成员。`, 
    { x: '10%', y: '60%', color: '#000000', fontSize: 14,}
);

ppt.writeFile({
    fileName: '中国所有大学.pptx'
})