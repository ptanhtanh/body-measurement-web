import React from 'react';
import { motion } from 'framer-motion';
import {
    Ruler,
    Weight,
    ArrowUpFromLine,
    Scan,
    CircleDot,
    Maximize2
} from 'lucide-react';

const MeasurementItem = ({ icon: Icon, label, value, unit, delay }) => {
    // Format value to 2 decimal places if it's a number
    const displayValue = typeof value === 'number' ? value.toFixed(2) : (value || '--');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-primary/30 transition-all group"
        >
            <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary group-hover:scale-110 transition-transform flex-shrink-0">
                <Icon size={16} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold truncate">{label}</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-white text-lg font-bold truncate">{displayValue}</span>
                    <span className="text-white/30 text-[10px] font-medium">{unit}</span>
                </div>
            </div>
        </motion.div>
    );
};

const MeasurementResults = ({ data }) => {
    if (!data) return null;

    const { height, weight, bmi, measurements } = data;

    // Safety check for measurements
    const m = measurements || {};

    // Helper to normalize and convert to cm if necessary
    const toCm = (val, isWeight = false, isBmi = false) => {
        if (val === undefined || val === null) return 0;
        if (isWeight || isBmi) return val;
        // If height is in meters (e.g. 1.76), convert to cm
        if (val < 10) return val * 100;
        return val;
    };

    const items = [
        { icon: Ruler, label: 'Height', value: toCm(height), unit: 'cm' },
        { icon: Weight, label: 'Weight', value: toCm(weight, true), unit: 'kg' },
        { icon: Scan, label: 'BMI', value: toCm(bmi, false, true), unit: '' },
        { icon: CircleDot, label: 'Neck', value: toCm(m.neck), unit: 'cm' },
        { icon: Scan, label: 'Chest', value: toCm(m.chest), unit: 'cm' },
        { icon: CircleDot, label: 'Waist', value: toCm(m.waist), unit: 'cm' },
        { icon: CircleDot, label: 'Belly', value: toCm(m.belly), unit: 'cm' },
        { icon: Maximize2, label: 'Hip', value: toCm(m.hips), unit: 'cm' },
        { icon: Ruler, label: 'Thigh', value: toCm(m.thigh), unit: 'cm' },
        { icon: Ruler, label: 'Knee', value: toCm(m.knee), unit: 'cm' },
        { icon: Ruler, label: 'Calf', value: toCm(m.calf), unit: 'cm' },
        { icon: CircleDot, label: 'Bicep', value: toCm(m.bicep), unit: 'cm' },
        { icon: ArrowUpFromLine, label: 'Shoulder Width', value: toCm(m.shoulder_width), unit: 'cm' },
        { icon: Ruler, label: 'Arm Length', value: toCm(m.arm_length), unit: 'cm' },
        { icon: ArrowUpFromLine, label: 'Shoulder to Crotch', value: toCm(m.shoulder_to_crotch), unit: 'cm' },
        { icon: Ruler, label: 'Outseam', value: toCm(m.outseam), unit: 'cm' },
        { icon: ArrowUpFromLine, label: 'Rise', value: toCm(m.rise), unit: 'cm' },
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-xl tracking-tight flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-brand-primary rounded-full" />
                    Measurement Results
                </h3>
                <div className="flex gap-2">
                    <span className="text-[10px] bg-brand-primary/10 text-brand-primary border border-brand-primary/20 px-2 py-1 rounded font-bold uppercase tracking-wider">Inferred</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {items.map((item, index) => (
                    <MeasurementItem
                        key={item.label}
                        {...item}
                        delay={index * 0.05}
                    />
                ))}
            </div>
        </div>
    );
};

export default MeasurementResults;
