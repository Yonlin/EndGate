﻿<%@ Page Title="" Language="C#" MasterPageFile="~/EndGate.Core.JS.Samples.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EndGate.Core.JS.Samples.Samples.MapBuilder.Default" %>

<asp:Content ID="Content4" ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        canvas {
            border: 1px solid black;
        }

        #builderPane{
            position: absolute;
            width: 100%;
            left: 0;
        }
    </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <ul class="breadcrumb">
        <li><a href="<%: ResolveUrl("~/") %>">EndGate JavaScript Samples</a> <span class="divider">/</span></li>
        <li class="active">Raw RPG</li>
    </ul>

    <div class="page-header">
        <h2>Map Builder</h2>
        <p>Demonstrates a accumulation of EndGate assets to help create SquareTileMaps visually.</p>
    </div>

    <div id="setupPane" class="form-horizontal well">
        <fieldset>
            <legend>Setup</legend>
            <div class="control-group">
                <label class="control-label" for="dimensionRows">Dimensions: </label>
                <div class="controls">
                    <input id="dimensionRows" class="input-small" type="text" value="100" placeholder="Rows..." /> X <input id="dimensionColumns" class="input-small" type="text" value="100" placeholder="Columns..." />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="tileSizeWidth">Tile Size: </label>
                <div class="controls">
                    <input id="tileSizeWidth" class="input-small" type="text" value="32" placeholder="Width..." /> X <input id="tileSizeHeight" class="input-small" type="text" value="32" placeholder="Height..." />
                </div>
            </div>
            <div class="form-actions">
                <button id="createMap" class="btn btn-primary">Create</button>
                <button id="resetSetup" class="btn">Reset</button>
            </div>
        </fieldset>
    </div>

    <div id="builderPane" class="hide" style="padding-left: 25px;">
        <p class="row">Move the box with <em>w/a/s/d or up/left/right/down.</em></p>

        <div class="row">
            <div class="form-vertical well pull-left" id="mapBuilderUtilities">
                <button class="btn">
                    <i class="icon-dragCamera"></i>
                </button>
            </div>
            <div class="form-search well pull-left" id="spriteSheetViewerUtilities">
                <input id="spriteSheetUrl" type="text" class="input-medium" value="http://localhost:8718/Samples/RawRPG/images/wood_tileset_3.png" placeholder="Spritesheet URL..." />
                <button id="getSpriteSheet" class="btn">Get</button>
            </div>
        </div>

        <div class="row">
            <div id="mapBuilder" class="form-vertical well pull-left" style="height: 600px;">
            </div>
            <div id="spriteSheetViewer" class="form-vertical well pull-left" style="height:600px;">
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="Scripts" runat="server">
    <script src="GridEntry.js"></script>
    <script src="MapBuilder.js"></script>
    <script src="SpriteSheetViewer.js"></script>
    <script src="TileHighlighter.js"></script>
    <script src="TileFiller.js"></script>
    <script src="TileSelector.js"></script>
    <script src="CameraDragController.js"></script>
    <script src="CameraZoomController.js"></script>
    <script src="SetupManager.js"></script>
    <script src="Main.js"></script>
</asp:Content>