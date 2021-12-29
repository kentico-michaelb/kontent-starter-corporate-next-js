/* eslint-disable semi */
/* eslint-disable quotes */
import { getSitemapMappings } from "../../lib/api";
import { getUrlFromMapping } from "../../utils";

export default async function preview(req, res) {
  console.log("Entering preview");
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // THIS NEEDED TO BE ADDED
  setCookieSameSite(res, "None");

  const redirectItemCodename = req.query.redirectItemCodename;
  if (redirectItemCodename) {
    const mappings = await getSitemapMappings();
    const redirectTo = getUrlFromMapping(mappings, redirectItemCodename);
    res.redirect(redirectTo);
    return;
  }

  res.redirect("/");
}

const setCookieSameSite = (res, value) => {
  const cookies = res.getHeader("Set-Cookie");
  const updatedCookies = cookies?.map((cookie) =>
    cookie.replace(
      "SameSite=Lax",
      `SameSite=${value}; Secure;`
    )
  )

  res.setHeader(
    "Set-Cookie",
    updatedCookies
  );
};