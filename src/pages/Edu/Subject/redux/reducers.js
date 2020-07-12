import {
  GET_SUBJECT_LIST,
  GET_SECSUBJECT_LIST
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细user数据
};

export default function subjectList (prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      })
      return action.data;

    case GET_SECSUBJECT_LIST:
      // 把二级分类数据，添加到对应一级分类数据的children属性上

      if (action.data.items.length > 0) {
        const parentId = action.data.items[0].parentId
        // 2找到对应的一级分类
        // 遍历一级分类
        prevState.items.forEach(item => {
          if (item._id === parentId) {
            item.children = action.data.items
          }
        })
      }
      return {
        ...prevState
      }
    default:
      return prevState;
  }
}
