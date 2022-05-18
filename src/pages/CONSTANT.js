import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import CONFIG from "../config";
import axios from "axios";
export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      field: "files",
      // endpoints: {
      //   byFile: `${CONFIG.API_URL}/upload`, // Your backend file uploader endpoint
      //   byUrl: `${CONFIG.API_URL}/fetchUrl`, // Your endpoint that provides uploading by Url
      // },
      uploader: {
        uploadByFile(file) {
          console.log(file);

          var data = new FormData();
          data.append("files", file);

          var config = {
            method: "post",
            url: `${CONFIG.API_URL}/upload`,
            headers: {},
            data: data,
          };

          return axios(config)
            .then(function (response) {
              console.log(response.data);
              return {
                success: 1,
                file: {
                  url: `${CONFIG.API_URL}${response.data[0].url}`,
                  // any other image data you want to store, such as width, height, color, extension, etc
                },
              };
            })
            .catch(function (error) {
              console.log(error);
            });

          // your own uploading logic here
          // return MyAjax.upload(file).then(() => {

          // });
        },
      },
    },
  },
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
