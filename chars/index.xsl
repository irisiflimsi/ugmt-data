<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="xml" doctype-public="-//W3C//DTD DTD XHTML 1.1//EN" doctype-system="http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd" indent="yes"/>
  <xsl:strip-space elements="*"/>
  <xsl:template match="data">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Characters</title>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
        <script src="/main.js" type="text/javascript" />
        <script src="/chars/chars.js" type="text/javascript" />
        <script src="/chars/SM/script.js" type="text/javascript" />
        <script src="/chars/DSA/script.js" type="text/javascript" />
        <script src="/chars/HM3/script.js" type="text/javascript" />
      </head>
      <body onload="load()">
        <h1 class="bigentity">Characters</h1>
        <table style="width:100%;height:100%;">
          <tr>
            <td style="width:15%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr>
                  <td class="frame" id="buttons" style="width:100%;height:auto;">
                    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
                      <a href="javascript:printmain()">PDF</a>
                    </div>
                    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
                      <a href="javascript:rptok()">RPTOK</a>
                    </div>
                    <xsl:apply-templates select="document('templates.xml')/templates/template" />
                  </td>
                </tr>
                <tr style="height:100%">
                  <td class="frame" style="width:100%;height:100%;">
                    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
                      <a href="ugmt.chars?tmpl=chars/index.xsl&amp;tag=char">
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
            <td style="width:20%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr style="height:100%;">
                  <td class="frame" id="charlist" style="width:100%;">
                    <xsl:apply-templates select="//doc_char/char">
                      <xsl:sort select="@name"/>
                    </xsl:apply-templates>
                  </td>
                </tr>
                <tr>
                  <td class="frame" id="artlist" style="width:100%;">
                    <xsl:apply-templates select="//art[@select='true']">
                      <xsl:sort select="@name"/>
                    </xsl:apply-templates>
                  </td>
                </tr>
              </table>
            </td>
            <td style="width:65%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr>
                  <td class="frame" style="width:100%;height:100%;" id="field"/>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="char">
    <span class="listing smallentity" onmouseover="high(this)" onmouseout="low(this)">
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text></xsl:text>
        </xsl:attribute>
        <xsl:attribute name="onclick">
          <xsl:text>return permit(this,'chars')</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="title">
          <xsl:value-of select="@id"/>
        </xsl:attribute>
        <xsl:element name="img">
          <xsl:attribute name="class">lefticon</xsl:attribute>
          <xsl:attribute name="id">
            <xsl:value-of select="@id"/>
            <xsl:text>_permit</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="src">
            <xsl:choose>
              <xsl:when test="@permit='true'">/permit.png</xsl:when>
              <xsl:otherwise>/unpermit.png</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
        </xsl:element>
      </xsl:element>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text></xsl:text>
        </xsl:attribute>
        <xsl:attribute name="onclick">
          <xsl:text>return select(this,'chars')</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="title">
          <xsl:value-of select="@id"/>
        </xsl:attribute>
        <xsl:element name="img">
          <xsl:attribute name="class">lefticon</xsl:attribute>
          <xsl:attribute name="id">
            <xsl:value-of select="@id"/>
            <xsl:text>_select</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="src">
            <xsl:choose>
              <xsl:when test="@select='true'">/select.png</xsl:when>
              <xsl:otherwise>/unselect.png</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
        </xsl:element>
      </xsl:element>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>javascript:use(&quot;</xsl:text>
          <xsl:value-of select="@id"/>
          <xsl:text>&quot;)</xsl:text>
        </xsl:attribute>
        <xsl:value-of select="attribute[@name='Name']/@value"/>
      </xsl:element>
    </span>
  </xsl:template>

  <xsl:template match="template">
    <xsl:element name="div">
      <xsl:attribute name="class">button mediumentity</xsl:attribute>
      <xsl:attribute name="id">
        <xsl:value-of select="@file"/>
      </xsl:attribute>
      <xsl:attribute name="onmouseover">high(this)</xsl:attribute>
      <xsl:attribute name="onmouseout">low(this)</xsl:attribute>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>javascript:radioclick(&quot;</xsl:text>
          <xsl:value-of select="@file"/>
          <xsl:text>&quot;)</xsl:text>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template match="tag">
    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>/ugmt.chars?tmpl=chars/index.xsl&amp;tag=char&amp;key=</xsl:text>
          <xsl:value-of select="@name"/>
        </xsl:attribute>
        <xsl:value-of select="@name"/>
      </xsl:element>
    </div>
  </xsl:template>

</xsl:stylesheet>
