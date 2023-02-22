
import * as bezier from "./bezier.js";

export function createRandomSplineSegment(runtime,seed,p0_X,p0_Y,p0_Z,vX,vY,vZ,overall_vPercentChange,overall_vMagnitudeTarget,overall_vMagnitudePercentChange,p1_vMagnitudeMin,p1_vMagnitudeMax,p2_vMagnitudeMin,p2_vMagnitudeMax,p2_vectorPercentChange,steps){

	//convert vX, vY, and vZ to unit in case it is not.  this will be used of p2 down below.
	var vMagnitude =  Math.pow((Math.pow(vX,2)+Math.pow(vY,2)+Math.pow(vZ,2)),0.5);
	var v_X = vX/vMagnitude;
	var v_Y = vY/vMagnitude;
	var v_Z = vZ/vMagnitude;

	//First, use vX, vY, vZ and target parameters to determine new vector and p4 location.
	var rand1 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X,p0_Y);
	var rand2 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+100,p0_Y+100);
	var rand3 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+200,p0_Y+200);
	
	var overall_temp_vX = vX-overall_vPercentChange*overall_vMagnitudeTarget+rand1*overall_vPercentChange*overall_vMagnitudeTarget*2;
	//var overall_temp_vY = vY-overall_vPercentChange*overall_vMagnitudeTarget+rand2*overall_vPercentChange*overall_vMagnitudeTarget*2;
	var overall_temp_vY = vY*1.4;
	var overall_temp_vZ = vZ-overall_vPercentChange*overall_vMagnitudeTarget+rand3*overall_vPercentChange*overall_vMagnitudeTarget*2;
	
	//var new_overall_temp_vY = Math.max(Math.abs(overall_temp_vX),Math.abs(overall_temp_vY),Math.abs(overall_temp_vZ));
	
	var overall_temp_vMagnitude = Math.pow((Math.pow(overall_temp_vX,2)+Math.pow(overall_temp_vY,2)+Math.pow(overall_temp_vZ,2)),0.5);
	
	var overall_temp_v_X = overall_temp_vX/overall_temp_vMagnitude;
	var overall_temp_v_Y = overall_temp_vY/overall_temp_vMagnitude;
	var overall_temp_v_Z = overall_temp_vZ/overall_temp_vMagnitude;
	
	var overall_vMagnitude = overall_vMagnitudeTarget-overall_vMagnitudePercentChange*overall_vMagnitudeTarget+Math.random()*overall_vMagnitudePercentChange*overall_vMagnitudeTarget*2;
	var overall_vX = overall_temp_v_X*overall_vMagnitude;
	var overall_vY = overall_temp_v_Y*overall_vMagnitude;
	var overall_vZ = overall_temp_v_Z*overall_vMagnitude;
	
	var p3_X = p0_X+overall_vX;
	var p3_Y = p0_Y+overall_vY;
	var p3_Z = p0_Z+overall_vZ;
	
	//Next, determine p1. p1_vMagnitudeMin and p1_vMagnitudeMax are expressed as a percentage of the overall magnitude.
	
	var rand4 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+300,p0_Y+300);
	
	var p1_vMagnitude = p1_vMagnitudeMin*overall_vMagnitude+rand4*(p1_vMagnitudeMax-p1_vMagnitudeMin)*overall_vMagnitude;
	var p1_vX = v_X*p1_vMagnitude;
	var p1_vY = v_Y*p1_vMagnitude;
	var p1_vZ = v_Z*p1_vMagnitude;
	
	
	var p1_X = p0_X+p1_vX;
	var p1_Y = p0_Y+p1_vY;
	var p1_Z = p0_Z+p1_vZ;
	
	//Next, determine p2. p2_vMagnitudeMin and p2_vMagnitudeMax are expressed as a percentage of the overall magnitude. The percent change on the vector is relative to thew new vector between p0 and p3.  Also note that this magnitude will be applied relative to p3.  As such, each component vector is subtracted from p3 rather than added.

	var rand5 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+400,p0_Y+400);
	var rand6 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+500,p0_Y+500);
	var rand7 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+600,p0_Y+600);
	
	var p2_temp_vX = overall_vX-p2_vectorPercentChange*overall_vX+rand5*p2_vectorPercentChange*overall_vX*2;
	var p2_temp_vY = overall_vY-p2_vectorPercentChange*overall_vY+rand6*p2_vectorPercentChange*overall_vY*2;
	var p2_temp_vZ = overall_vZ-p2_vectorPercentChange*overall_vZ+rand7*p2_vectorPercentChange*overall_vZ*2;
	
	var p2_temp_vMagnitude = Math.pow((Math.pow(p2_temp_vX,2)+Math.pow(p2_temp_vY,2)+Math.pow(p2_temp_vZ,2)),0.5);
	
	var p2_temp_v_X = p2_temp_vX/p2_temp_vMagnitude;
	var p2_temp_v_Y = p2_temp_vY/p2_temp_vMagnitude;
	var p2_temp_v_Z = p2_temp_vZ/p2_temp_vMagnitude;
	
	var rand8 = runtime.callFunction("get2DRandomNoiseValue", 1,seed,"classic",p0_X+700,p0_Y+700);
	
	var p2_vMagnitude = p2_vMagnitudeMin*overall_vMagnitude+rand8*(p2_vMagnitudeMax-p2_vMagnitudeMin)*overall_vMagnitude;
	var p2_vX = p2_temp_v_X*p2_vMagnitude;
	var p2_vY = p2_temp_v_Y*p2_vMagnitude;
	var p2_vZ = p2_temp_v_Z*p2_vMagnitude;
	
	var p2_X = p3_X-p2_vX;
	var p2_Y = p3_Y-p2_vY;
	var p2_Z = p3_Z-p2_vZ;

	
	//now populate all into points.
	var points = [{x:p0_X, y:p0_Y, z:p0_Z}, {x:p1_X, y:p1_Y, z:p1_Z}, {x:p2_X, y:p2_Y, z:p2_Z}, {x:p3_X, y:p3_Y, z:p3_Z}];

	//generate bezier curve.
	const b = new bezier.Bezier(points);

	//generate lookup table.
	var lut = b.getLUT(steps);
	
	var equalLut = [];
	
	//get linear length between lut points.
	var linearLength = 0;
	
	for (var i=1; i<lut.length; i++){
		
		var temp_dX = lut[i].x - lut[i-1].x;
		var temp_dY = lut[i].y - lut[i-1].y;
		var temp_dZ = lut[i].z - lut[i-1].z;
		
		linearLength += Math.pow((Math.pow(temp_dX,2)+Math.pow(temp_dY,2)+Math.pow(temp_dZ,2)),0.5);
	}
	
	var stepTarget = b.length() / steps;
	
	//console.log(b.length())
	//console.log(linearLength)
	//console.log(stepTarget);
	var lastT = 0;
	
	var startX = p0_X;
	var startY = p0_Y;
	var startZ = p0_Z;
	
	var check = b.get(0.02);
	//console.log(check.x)
	
	for (var i=0; i< (steps + 1); i++){
		equalLut[i] = {};
		
		var currentTarget = stepTarget*i;
		
		equalLut[i].t=i*(1/steps);
		
		if (i==0){
			equalLut[i].x=startX;
			equalLut[i].y=startY;
			equalLut[i].z=startZ;
		}
		else if (i==steps){
			equalLut[i].x=p3_X;
			equalLut[i].y=p3_Y;
			equalLut[i].z=p3_Z;
		}
		else{
		
			for (var t = lastT; t < 1; t+=0.0001){

				var check = b.get(t);
				var check_dX = check.x-startX;
				var check_dY = check.y-startY;
				var check_dZ = check.z-startZ;

				var check_Mag = Math.pow((Math.pow(check_dX,2)+Math.pow(check_dY,2)+Math.pow(check_dZ,2)),0.5);

				if (check_Mag >= stepTarget){

					equalLut[i].x=check.x;
					equalLut[i].y=check.y;
					equalLut[i].z=check.z;

					lastT = t;

					startX = check.x;
					startY = check.y;
					startZ = check.z;

					break;

				}

			}
		
		}
		
		
	}
	//console.log(equalLut)
	
	//set array object sizes
	runtime.objects.spline_Xs.getFirstPickedInstance().setSize(equalLut.length);
	runtime.objects.spline_Ys.getFirstPickedInstance().setSize(equalLut.length);
	runtime.objects.spline_Zs.getFirstPickedInstance().setSize(equalLut.length);
	runtime.objects.spline_Ts.getFirstPickedInstance().setSize(equalLut.length);
	//populate arrays
	for (var i=0; i<equalLut.length; i++){
	runtime.objects.spline_Xs.getFirstPickedInstance().setAt(equalLut[i].x,i);
	runtime.objects.spline_Ys.getFirstPickedInstance().setAt(equalLut[i].y,i);
	runtime.objects.spline_Zs.getFirstPickedInstance().setAt(equalLut[i].z,i);
	runtime.objects.spline_Ts.getFirstPickedInstance().setAt(equalLut[i].t,i);
	}
	
	//update instance variables of tunnel.
	const tunnel = runtime.objects.tunnels.getFirstPickedInstance();
	tunnel.instVars.p0_X = p0_X;
	tunnel.instVars.p0_Y = p0_Y;
	tunnel.instVars.p0_Z = p0_Z;
	tunnel.instVars.start_vX = vX;
	tunnel.instVars.start_vY = vY;
	tunnel.instVars.start_vZ = vZ;
	tunnel.instVars.p3_X = p3_X;
	tunnel.instVars.p3_Y = p3_Y;
	tunnel.instVars.p3_Z = p3_Z;
	tunnel.instVars.end_vX = p2_vX;
	tunnel.instVars.end_vY = p2_vY;
	tunnel.instVars.end_vZ = p2_vZ;
	tunnel.instVars.length = b.length();
}



export function circle3D_xyz (runtime,cX,cY,cZ,pX,pY,pZ,r,granularity,angleOffset){
	
	//Based on solution by Zarrax at: 
	//https://math.stackexchange.com/questions/73237/parametric-equation-of-a-circle-in-3d-space
	
	// let vactor a and b be vectors perpindicular to axis and each other.
	
	//first determine unit vector v in direction of axis
	var vX = pX-cX;
	var vY = pY-cY;
	var vZ = pZ-cZ;
	
	var vMagnitude = Math.pow((Math.pow(vX,2)+Math.pow(vY,2)+Math.pow(vZ,2)),0.5);
	
	var v_X = vX/vMagnitude;
	var v_Y = vY/vMagnitude;
	var v_Z = vZ/vMagnitude;
	
	//choose a by solving a dot v = 0
	//to solve, let aX and aZ arbitrarily be equal to 1.  I know that vY will always be non 0 in my implementation so there isn't a chamce for infinity.
	
	var aX = 1;
	var aZ = 1;
	var aY = ((aX*vX)+(aZ*vZ))/(-vY)
	
	//make sure a is a unit vector by scaling ||a|| = 1
	
	var aMagnitude = Math.pow((Math.pow(aX,2)+Math.pow(aY,2)+Math.pow(aZ,2)),0.5);
	
	var a_X = aX/aMagnitude;
	var a_Y = aY/aMagnitude;
	var a_Z = aZ/aMagnitude;
	
	//now let b equal a cross v.
	
	var b_X = a_Y*v_Z-a_Z*v_Y;
	var b_Y = a_Z*v_X-a_X*v_Z;
	var b_Z = a_X*v_Y-a_Y*v_X;
	
	//now we can solve for any point on the circle with radius and theta.  We will use the granularity parameter to populate an array of xs, ys, and zs that are distributed around the circle.
	
	var xs = [];
	var ys = [];
	var zs = [];
	
	// we will vary theta from 0 to 2 pi.
	var theta = 0;
	
	var angleOffsetRad = angleOffset*(180/Math.PI);
	
	for (var i=0; i<granularity; i++){
		theta = (i/(granularity-1))*2*Math.PI+angleOffsetRad;
		
		xs[i] = cX + r*Math.cos(theta)*a_X+r*Math.sin(theta)*b_X;
		ys[i] = cY + r*Math.cos(theta)*a_Y+r*Math.sin(theta)*b_Y;
		zs[i] = cZ + r*Math.cos(theta)*a_Z+r*Math.sin(theta)*b_Z;
	
	}
	
	//set array object sizes
	runtime.objects.circle_Xs.getFirstInstance().setSize(xs.length);
	
	runtime.objects.circle_Ys.getFirstInstance().setSize(ys.length);

	runtime.objects.circle_Zs.getFirstInstance().setSize(zs.length);
	
	//populate arrays
	for (var i=0; i<xs.length; i++){
	runtime.objects.circle_Xs.getFirstInstance().setAt(xs[i],i);
	
	runtime.objects.circle_Ys.getFirstInstance().setAt(ys[i],i);

	runtime.objects.circle_Zs.getFirstInstance().setAt(zs[i],i);
	
	}

}