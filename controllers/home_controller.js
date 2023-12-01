module.exports.home = function (req, res) {
  //   return res.end("<h1>Express is up for Bloodline</>");
  //   return res.render("");
  return res.render("front-end", {
    title: "BloodLine"
  });
};

//module.exports.actionName = fuction(req,res){}
// module.exports.homepage = function (req, res) {
//   return res.render("front-end", {
//     title: "BloodLine"
//   });
// };
