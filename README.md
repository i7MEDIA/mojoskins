# mojoskins
Free Skins for mojoPortal

With this project we can more freely grant access to the repository so that designers can contribute designs and evolve them over time to keep up with any changes or new features in mojoPortal CMS.

## Benefits of Contributing to this Project
* The Design can have a link to the designer site
* The Design can be licensed according to your own preferences
* Showcasing your design skills can lead to referrals for design work
* Promote and Support the mojoPortal Project by showing what is possible with good design

Note that the individual skins provided in this project may have their own licenses determined by the designer and indicated by a file in the skin folder. If no other license is provided then the default project license is MIT, but a licence specified by the designer supersedes the default project license. 

Note also that while this project aims to provide some nice looking skins, not all of the skins will be finished designs, some skins may be intended only as a starting point for further design. 

## Using Bootswatch with Framework Skin
To learn how to use [Bootswatch](https://bootswatch.com/) with the Framework skin, [follow these instructions](https://www.mojoportal.com/customizing-framework-with-bootswatch).

## Using a Skin with a mojoPortal "Pro" Feature
You will need to open the theme.skin file for the skin you are wanting to use and uncomment these controls. The comments are asp.net webforms comments (`<%-- --%>`) so to remove the comments you need to remove those beginning and ending elements.

* `<%@ Register TagPrefix="sts" Namespace="sts.Web.UI" Assembly="sts.Web.UI" %>`
* `<%@ Register Namespace="sts.Events.Web.UI.Controls" Assembly="sts.Events.Web.UI" TagPrefix="ecp" %>`
* `<%@ Register Namespace="sts.FormWizard.Web.UI" Assembly="sts.FormWizard.Web.UI" TagPrefix="stsfw" %>`
* `<sts:CalendarGrid runat="server" ... `
* `<ecp:EventDisplaySettings runat="server" ... `
* `<stsfw:FormWizardDisplaySettings runat="server" ... `
* `<portal:BasePanel runat="server" SkinID="FWPOptionControls" .. `
