$(document).ready(function () {
  fetch("./results1.json")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      console.log(jsondata);
      var table = $("#example").DataTable({
        data: jsondata,
        columns: [
          { title: "level" },
          { title: "page_num" },
          { title: "block_num" },
          { title: "par_num" },
          { title: "line_num" },
          { title: "word_num" },
          { title: "left" },
          { title: "top" },
          { title: "width" },
          { title: "height" },
          { title: "conf" },
          { title: "text" },
        ],
        initComplete: function () {
          $("#example tbody").on("click", "tr", function () {
            $(this).toggleClass("selected");
        });
        $("#example tbody").on("click", "tr", function () {
            let src = cv.imread(imgElement);
            image_ht = src.rows;

            data=table.row(this).data();
            image_wt = src.cols;
            console.log(image_ht);
            console.log(image_wt);
            let left = data[6];
            let top = data[7];
            let width = data[8];
            let height = data[9];


            let point0 = new cv.Point(left, top);
            let point1 = new cv.Point(left + width, top + height);
            cv.rectangle(src, point0, point1, [255, 0, 0, 255]);
            let dst = new cv.Mat();

            let dsize = new cv.Size(799, 800);
            cv.resize(src, dst, dsize, -1, 0, cv.INTER_AREA);
            cv.imshow("canvasOutput", dst);
            src.delete();
            dst.delete();
          });
        },
      });
    });
});
