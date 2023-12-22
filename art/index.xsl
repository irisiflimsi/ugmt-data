<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="xml" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" indent="yes"/>
  <xsl:strip-space elements="*"/>
  <xsl:template match="data">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Art</title>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
        <link rel="stylesheet" type="text/css" href="/art/art.css"/>
        <script src="/main.js" type="text/javascript" />
        <script src="/art/art.js" type="text/javascript" />
      </head>
      <body onload="socket('art')">
        <h1 class="bigentity">Art</h1>
        <table style="width:100%;height:100%;">
          <tr>
            <td style="width:15%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr>
                  <td class="frame" style="width:100%;height:100%;">
                    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
                      <a href="/ugmt.art?tmpl=art/index.xsl&amp;tag=image">
                        All
                      </a>
                    </div>
                    <xsl:apply-templates select="//doc_tag/tag">
                      <xsl:sort select="@name"/>
                    </xsl:apply-templates>
                  </td>
                </tr>
              </table>
            </td>
            <td style="width:85%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr>
                  <td class="frame" style="width:100%;height:100%;" id="field">
                    <xsl:apply-templates select="//doc_art/art">
                      <xsl:sort select="@name"/>
                    </xsl:apply-templates>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  </xsl:template>
  
  <xsl:template match="tag">
    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>/ugmt.art?tmpl=art/index.xsl&amp;tag=art&amp;key=</xsl:text>
          <xsl:value-of select="@chain"/>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </xsl:element>
    </div>
  </xsl:template>

  <xsl:template match="art">
    <xsl:element name="div">
      <xsl:attribute name="style">display:inline-block;position:relative;width:136px;height:136px;</xsl:attribute>
      <xsl:attribute name="onmouseover">high(this)</xsl:attribute>
      <xsl:attribute name="onmouseout">low(this)</xsl:attribute>      
      <xsl:attribute name="onclick">select(this,'art')</xsl:attribute>
      <xsl:attribute name="title">
        <xsl:value-of select="@id"/>
      </xsl:attribute>
      <xsl:element name="img">
        <xsl:attribute name="style">position:absolute;left:0px;top:0px;width:128px;height:128px;z-index:0;</xsl:attribute>
        <xsl:attribute name="class">
          <xsl:text>art</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="title">
          <xsl:value-of select="@name"/>
        </xsl:attribute>
        <xsl:attribute name="src">
          <xsl:text>/ugmt.art?size=128&amp;id=</xsl:text>
          <xsl:value-of select="@id"/>
        </xsl:attribute>
      </xsl:element>
      <xsl:element name="img">
        <xsl:attribute name="style">overflow:visible;position:absolute;left:10px;top:10px;width:16px;height:16px;z-index:1;</xsl:attribute>
        <xsl:attribute name="id">
          <xsl:value-of select="@id"/>
          <xsl:text>_select</xsl:text>
        </xsl:attribute>
        <xsl:if test="@select = 'true'">
          <xsl:attribute name="src">/select.png</xsl:attribute>
        </xsl:if>
        <xsl:if test="not(@select) or (@select != 'true')">
          <xsl:attribute name="src">/unselect.png</xsl:attribute>
        </xsl:if>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  
</xsl:stylesheet>
