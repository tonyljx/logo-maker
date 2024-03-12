// 前端展示数据的schmea
export type TImgShow = {
  imgSrc: string;
  prompt: string;
};

// 后端插入图片数据的schema
export type TImgInsert = {
  userEmail: string;
  createdAt: Date;
  src: string;
  prompt: string;
};

export type TImgShowBackend = {
  createdAt: Date;
  src: string;
  prompt: string;
};
