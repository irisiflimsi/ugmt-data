<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:template match="index">
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>UGMT2</title>
        <link rel="stylesheet" type="text/css" href="main.css"/>
        <link rel="icon" type="image/png" href="favicon.png"/>
        <script src="main.js" type="text/javascript"></script>
      </head>
      <body width="100%" height="100%">
        <table class="overview">
          <tr/>
          <tr>
            <xsl:apply-templates select="(//item)[position()&lt;6]"/>
          </tr>
          <tr>
            <xsl:apply-templates select="(//item)[position()&gt;5 and position()&lt;11]"/>
          </tr>
          <tr>
            <xsl:apply-templates select="(//item)[position()&gt;10]"/>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="overview bigentity" onmouseover="high(this)" onmouseout="low(this)">
              <img src="permit.png" style="margin-right:12px;margin-bottom:-1px;"/>
              <a href="" onclick="return save('all')">Save</a>
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="item">
    <xsl:element name="td">
      <xsl:attribute name="class">
        <xsl:text>overview bigentity</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:value-of select="@dirname"/>
      </xsl:attribute>
      <xsl:attribute name="onmouseover">
        <xsl:text>high(this)</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="onmouseout">
        <xsl:text>low(this)</xsl:text>
      </xsl:attribute>
      <xsl:if test="@permit='false'">
        <xsl:element name="img">
          <xsl:attribute name="src">
            <xsl:text>permit.png</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="style">margin-right:12px;margin-bottom:-1px;</xsl:attribute>
        </xsl:element>
      </xsl:if>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:value-of select="@dirname"/>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
