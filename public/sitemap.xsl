<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html>
      <head>
        <title>InterviewCue Sitemap</title>
        <style>
          body {
            margin: 0;
            padding: 40px;
            color: #111827;
            background: #f8fafc;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          main {
            max-width: 1080px;
            margin: 0 auto;
          }
          h1 {
            margin: 0 0 8px;
            font-size: 28px;
            line-height: 1.2;
          }
          p {
            margin: 0 0 24px;
            color: #64748b;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            background: #ffffff;
          }
          th,
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
            vertical-align: top;
            font-size: 14px;
          }
          th {
            color: #334155;
            background: #eef6ff;
            font-weight: 700;
          }
          a {
            color: #1263e6;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <main>
          <h1>InterviewCue Sitemap</h1>
          <p>This sitemap helps search engines discover canonical InterviewCue URLs.</p>

          <xsl:choose>
            <xsl:when test="sitemap:urlset/sitemap:url">
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    <th>Last modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc" />
                        </a>
                      </td>
                      <td>
                        <xsl:value-of select="sitemap:lastmod" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>
            <xsl:otherwise>
              <table>
                <thead>
                  <tr>
                    <th>Sitemap</th>
                    <th>Last modified</th>
                  </tr>
                </thead>
                <tbody>
                  <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                    <tr>
                      <td>
                        <a href="{sitemap:loc}">
                          <xsl:value-of select="sitemap:loc" />
                        </a>
                      </td>
                      <td>
                        <xsl:value-of select="sitemap:lastmod" />
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
