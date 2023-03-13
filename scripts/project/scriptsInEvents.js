// importsForEvents.js
import * as tunnel from "./tunnel.js";


const scriptsInEvents = {

	async E_main_Event266_Act1(runtime, localVars)
	{
		tunnel.createRandomSplineSegment(runtime,localVars.seed,localVars.p0_X,localVars.p0_Y,localVars.p0_Z,localVars.vX,localVars.vY,localVars.vZ,localVars.overall_vPercentChange,localVars.overall_vMagnitudeTarget,localVars.overall_vMagnitudePercentChange,localVars.p1_vMagnitudeMin,localVars.p1_vMagnitudeMax,localVars.p2_vMagnitudeMin,localVars.p2_vMagnitudeMax,localVars.p2_vectorPercentChange,localVars.tunnelSplineGranularity-1)
	},

	async E_main_Event275_Act1(runtime, localVars)
	{
		tunnel.circle3D_xyz(runtime,localVars.cX,localVars.cY,localVars.cZ,localVars.pX,localVars.pY,localVars.pZ,localVars.r,localVars.granularity,localVars.angleOffset)
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

