SiteProfileSetting = {};

var map = null;

function CreateLayer()
{
	layer = new VEShapeLayer();
	map.AddShapeLayer(layer);
}

function GetMap()
{  
	map = new VEMap('myMap');
	map.SetDashboardSize(VEDashboardSize.Tiny);
	
	map.LoadMap(SiteProfileSettings["Location"], 15);
	// map.HideDashboard();
	map.SetScaleBarDistanceUnit(VEDistanceUnit.Kilometers);
	CreateLayer();
	//Add a pushpin to the new layer
	shape = new VEShape(VEShapeType.Pushpin, map.GetCenter());
	shape.SetTitle(SiteProfileSettings['LegalCompanyName']);
	//shape.SetTitle("MINE");
	shape.SetDescription( SiteProfileSettings["MailingAddressLine1"]+ ' . ' +SiteProfileSettings['MailingCity']+ ', ' +SiteProfileSettings['MailingProvince']+ '  ' +SiteProfileSettings['MailingCountry']+ " . Phone " + SiteProfileSettings['Phone']);
	layer.AddShape(shape); 
}


window.onload = function()
{
	GetMap();
}
