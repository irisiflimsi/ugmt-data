<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="xml" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Directory Listing</title>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <link rel="stylesheet" type="text/css" href="/main.css"/>
      </head>
      <body>
        <div/>
        <h1 class="bigentity">Directory Listing</h1>
        <center>
          <div>
            <xsl:apply-templates select="//file">
              <xsl:sort select="@name"/>
            </xsl:apply-templates>
          </div>
        </center>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="file">
    <xsl:element name="a">
      <xsl:attribute name="class">mediumentity listing</xsl:attribute>
      <xsl:attribute name="href">
        <xsl:value-of select="@path"/>
      </xsl:attribute>
      <xsl:element name="img">
        <xsl:attribute name="class">listing</xsl:attribute>
        <xsl:attribute name="src">
          <xsl:choose>
            <xsl:when test="substring(@name, string-length(@name) - 3, string-length(@name)) = '.jpg'">
              <xsl:value-of select="@path"/>
            </xsl:when>
            <xsl:when test="substring(@name, string-length(@name) - 3, string-length(@name)) = '.png'">
              <xsl:value-of select="@path"/>
            </xsl:when>
            <xsl:when test="substring(@name, string-length(@name) - 3, string-length(@name)) = '.gif'">
              <xsl:value-of select="@path"/>
            </xsl:when>
            <xsl:otherwise>/void.png</xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xsl:element>
      <xsl:value-of select="@name"/>
    </xsl:element>
  </xsl:template>
</xsl:stylesheet>
