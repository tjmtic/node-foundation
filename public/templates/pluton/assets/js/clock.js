//
//  Clock.js
//
//  Created by Christopher Ahlers on 7/31/2017.
//  Copyright (c) 2017 Christopher Ahlers. All rights reserved.
//

const PI_2 = Math.PI / 2
const PI_6 = Math.PI / 6
const PI_30 = Math.PI / 30
const minusPI_2 = -PI_2

const MILLIS_PER_SECOND = 1000
const MILLIS_PER_MINUTE = 60000
const MILLIS_PER_HOUR = 3600000
const SECONDS_PER_MINUTE = 60
const SECONDS_PER_HOUR = 3600
const MINUTES_PER_HOUR = 60

class Clock extends PIXI.Graphics
{
    constructor(diameter = 200)
    {
        super()

        this.interactive = true
        this.nativeLines = true

        this.diameter = diameter

        this.faceColor = 0xFFFFFF
        this.faceAlpha = 0.7

        this.borderColor = 0x0
        this.borderAlpha = 0.75

        // this.face12HourFontStyle = { fontSize: 48, fill: 0x0/*, fontFamily: 'Avenir'*/ }
        // this.face24HourFontStyle = { fontSize: 24, fill: 0x0 /*, fontFamily: 'Avenir' */}

        this.hourHand = this.minuteHand = this.secondHand = { rotation: 0}

        this.secondHandSweep = true
    }

    drawFace()
    {
        this.face = new PIXI.Graphics()
        this.face.lineStyle(6, this.borderColor, this.borderAlpha)
        this.face.beginFill(this.faceColor, this.faceColor)
        this.face.drawCircle(0, 0, this.diameter + 2)
        this.face.endFill()

        const centerPoint = new PIXI.Graphics()
        centerPoint.beginFill(this.borderColor, this.borderAlpha)
        centerPoint.drawCircle(0, 0, 7)
        centerPoint.endFill()
        this.face.addChild(centerPoint)

        this.addChild(this.face)
    }

    drawTicks(num, tickLength, color = 0x0, alpha = 1)
    {
        for (let i = 0; i < num; i++) {
            const child = new PIXI.Graphics()
            child.lineStyle(2, color, alpha)
            child.moveTo(-this.diameter, 0)
            child.lineTo(-this.diameter + tickLength, 0)
            child.rotation = i * (Math.PI / num * 2)
            this.face.addChild(child)
        }
    }

    draw12HourClockText(offset, fontStyle)
    {
        this.drawClockText(offset, fontStyle)
    }

    draw24HourClockText(offset, fontStyle)
    {
        this.drawClockText(offset, fontStyle, true)
    }

    drawClockText(offset, fontStyle, is24Hour = false)
    {
        for (let i = 0; i < 12; i++)
        {
            const rotation = -(i * PI_6)
            const radius = -(this.diameter - offset)

            const txt = new PIXI.Text(is24Hour ? `${24 - i}` :`${12 - i}`, fontStyle)
            txt.position.x = (radius * Math.cos(rotation + PI_2)) - (txt.width / 2)
            txt.position.y = (radius * Math.sin(rotation + PI_2)) - (txt.height / 2)

            this.face.addChild(txt)
        }
    }

    drawHourHand(length = -90, color = 0x88D317)
    {
        this.hourHand = this.addNeedle(length, color)
    }

    drawMinuteHand(length = -30, color = 0x0375B4)
    {
        this.minuteHand = this.addNeedle(length, color)
    }

    drawSecondHand(length = 5, color = 0xFF3B3F)
    {
        this.secondHand = this.addNeedle(length, color)
    }

    addNeedle(length, color)
    {
        const needle = new PIXI.Graphics()
        needle.lineStyle(5, color, 0.75)
        needle.moveTo(7, 0)
        needle.lineTo(this.diameter + length, 0)
        needle.rotation = minusPI_2
        this.addChild(needle)
        return needle
    }

    drawLocalTime()
    {
        this.drawCustomTime(moment)
    }

    drawUtcTime()
    {
        this.drawCustomTime(moment.utc)
    }

    drawUtcOffsetTime(offset)
    {
        this.drawCustomTime(() => { return moment().utcOffset(offset) })
    }

    drawCustomTime(time_fn)
    {
        const t = time_fn()
        this.drawTime(t.hour(), t.minute(), t.second(), this.secondHandSweep ? t.millisecond() : 0)
    }

    drawTime(hour = 0, minute = 0, second = 0, millisecond = 0)
    {
        this.secondHand.rotation = minusPI_2 +
            PI_30 * (second + (millisecond / MILLIS_PER_SECOND))

        this.minuteHand.rotation = minusPI_2 +
            PI_30 * (minute + (second / SECONDS_PER_MINUTE) + (millisecond / MILLIS_PER_MINUTE))

        this.hourHand.rotation = minusPI_2 +
            PI_6 * (hour + (minute / MINUTES_PER_HOUR) + (second / SECONDS_PER_HOUR) + (millisecond / MILLIS_PER_HOUR))
    }
}
