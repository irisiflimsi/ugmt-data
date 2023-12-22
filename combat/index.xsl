<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0" xmlns:xi="http://www.w3.org/2001/XInclude">
  <xsl:output method="xml" doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" doctype-public="-//W3C//DTD XHTML 1.0 Transitional//EN" indent="yes" />
  <xsl:strip-space elements="*" />

  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="data">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Combat</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/main.css" />
        <link rel="stylesheet" type="text/css" href="/combat/combat.css" />
        <script src="/main.js" type="text/javascript" />
        <script src="/combat/combat.js" type="text/javascript"></script>
      </head>
      <body onload="socket('combat')">
        <h1 class="bigentity">Combat</h1>
        <table style="width:100%;height:100%;">
          <tr>
            <td style="width:15%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr>
                  <td class="frame" id="buttons" style="width:100%;height:auto;">
                    <table id="buttons" style="width:100%;">
                      <tr>
                        <td>
                          <select id="rtyp" class="button mediumentity">
                            <option>Normal</option>
                            <option>Sicherheit</option>
                            <option>Risiko</option>
                          </select>
                          <div title="Angriff für Auswahl" class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)" onclick="angriff()">Angriff</div>
                          <div title="Aktiv VTD des Gegners im Angriff der Auswahl berücksichtigen" class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)" onclick="verteidigung()">Aktive VTD</div>
                          <div title="Schaden berechnen" class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)" onclick="schaden()">Schaden</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr style="height:auto;">
                  <td class="frame" style="width:100%;height:100%;">
                    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
                      <a href="/ugmt.combat?tmpl=combat/index.xsl&amp;tag=char">
                        All
                      </a>
                    </div>
                    <xsl:apply-templates select="//doc_tag/tag">
                      <xsl:sort select="@name" />
                    </xsl:apply-templates>
                  </td>
                </tr>
              </table>
            </td>
            <td style="width:20%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr>
                  <td class="frame" style="width:100%;height:auto;text-align:center;">
                    <xsl:apply-templates select="//doc_char/char" mode="list">
                      <xsl:sort select="@name" />
                    </xsl:apply-templates>
                  </td>
                </tr>
              </table>
            </td>
            <td style="width:65%;height:100%;">
              <table class="frame" style="width:100%;height:100%;">
                <tr style="width:100%;">
                  <td class="frame" style="width:100%;height:100%;">
                    <table id="field" class="combatsep" style="width:100%;">
                      <tr class="combatsep">
                        <th class="combat"><span class="smallentity">Name</span></th>
                        <th class="combat"><span class="smallentity">Gegner</span></th>
                        <th class="combat"><span class="smallentity">Waffe</span></th>
                        <th class="combat"><input readonly="true" class="smallentity" value="Misc."/></th>
                        <th class="combat"><input readonly="true" class="smallentity" value="Aktiv"/></th>
                        <th class="combat"><input readonly="true" class="smallentity" value="Angriff"/></th>
                        <th class="combat"><input readonly="true" class="smallentity" value="VTD"/></th>
                        <th class="combat"><input readonly="true" class="smallentity" value="Schad"/></th>
                        <th class="combat"><input readonly="true" class="smallentity" value="Ticks"/></th>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="char" mode="list">
    <xsl:element name="span">
      <xsl:attribute name="class">listing smallentity</xsl:attribute>
      <xsl:attribute name="onmouseover">high(this)</xsl:attribute>
      <xsl:attribute name="onmouseout">low(this)</xsl:attribute>
      <xsl:attribute name="id"><xsl:value-of select="@id" /></xsl:attribute>
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>javascript:create(&quot;</xsl:text>
          <xsl:value-of select="@id" />
          <xsl:text>&quot;)</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="data-title">name</xsl:attribute>
        <xsl:value-of select="@name" />
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template match="equipment">
    <xsl:element name="option">
      <xsl:attribute name="value">
        <xsl:value-of select="@wert" />
      </xsl:attribute>
      <xsl:attribute name="data-dam">
        <xsl:value-of select="@schaden" />
      </xsl:attribute>
      <xsl:attribute name="data-gsw">
        <xsl:value-of select="@wgs" />
      </xsl:attribute>
      <xsl:value-of select="@name" />
    </xsl:element>
  </xsl:template>

  <xsl:template match="tag">
    <div class="button mediumentity" onmouseover="high(this)" onmouseout="low(this)">
      <xsl:element name="a">
        <xsl:attribute name="href">
          <xsl:text>/ugmt.combat?tmpl=combat/index.xsl&amp;tag=char&amp;key=</xsl:text>
          <xsl:value-of select="@chain" />
        </xsl:attribute>
        <xsl:value-of select="@name" />
      </xsl:element>
    </div>
  </xsl:template>

</xsl:stylesheet>
